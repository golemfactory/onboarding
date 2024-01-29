// components/welcome/intro.tsx
import { motion } from 'framer-motion'
import { useDebounce } from 'usehooks-ts'
import { settings } from 'settings'
import { getNativeToken } from 'utils/getNativeToken'
import onboardingStyle from '../Onboarding.module.css'
import { useSwapOut } from 'hooks/useSwapOut'
import buttonStyle from 'components/atoms/button/button.module.css'
const variants = {
  show: { opacity: 1 },
  hidden: { opacity: 0 },
}
import { ChangeEvent, useEffect, useState } from 'react'
import { Slider, ISliderProps } from 'components/atoms/slider/slider'
import { useNetwork } from 'hooks/useNetwork'
import { useBalance } from 'hooks/useBalance'
import { useSwapEthForGlm } from 'hooks/useSwapEthForGlm'
import { formatEther } from 'utils/formatEther'
import { parseEther, parseUnits } from 'viem'
import { TooltipProvider } from 'components/providers/Tooltip.provider'
import { StepWithProgress } from 'components/templates/themes/defaultTheme/StepWithProgress'
import { IconInput } from 'components/atoms/iconInput/IconInput'
import { MaticCoinIcon, MaticIcon } from 'components/atoms/icons'
import { Wallet } from 'ethers'
import { WalletsConnector } from 'components/atoms/ornaments/walletsConnector'
import { LoadingSpinner } from 'components/atoms/spinner/spinner'
import { StartButton } from 'components/molecules/stepStartButton/StepStartButton'
import { RecommendationCardSwap } from 'components/molecules/recommendationCard/RecommendationCard'
import { use } from 'i18next'
import { Button, Trans } from 'components/atoms'
import { ExchangeRate } from 'components/molecules/exchangeRate/exchangeRate'

TooltipProvider.registerTooltip({
  id: 'swap',
  tooltip: {
    sections: ['explainGLMAmount', 'explainRecommendation'],
    appearance: 'primary',
  },
})

const SwapTokensPresentational = ({
  onSwapButtonClick,
  setPlacement,
  amountOut,
  showContent,
  setShowContent,
  placement,
  setAmount,
  amountIn,
  isError,
}: {
  onSwapButtonClick: () => void
  sliderProps: ISliderProps
  amountOut: bigint
  showContent: boolean
  setPlacement: (p: 'inside' | 'outside') => void
  setShowContent: (showContent: boolean) => void
  placement: 'inside' | 'outside'
  setAmount: (amount: number) => void
  amountIn: number
  isError: boolean
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const [glmOut, setGlmOut] = useState('')

  const [isAmountValid, setIsAmountValid] = useState(true)

  useEffect(() => {
    if (amountOut) {
      const newAmount = formatEther({ wei: amountOut || 0n, precision: 4 })
      setGlmOut(newAmount)
    }
  }, [amountOut])

  const handleSwapButtonClick = async () => {
    setIsLoading(true)
    await onSwapButtonClick()
  }
  console.log('isError', isError)
  useEffect(() => {
    if (placement === 'inside') {
      setShowContent(true)
    }
  }, [placement])
  return (
    <div>
      {!showContent && (
        <StartButton
          onClick={() => {
            setPlacement('inside')
          }}
          step="swap"
        />
      )}

      {showContent && (
        <div className="flex flex-col gap-6 pb-8">
          <RecommendationCardSwap />

          <div className="text-h4 text-primary pl-8 pr-8">
            <div className="grid grid-cols-4 pr-10">
              <div className="col-span-3 flex flex-col">
                <Trans i18nKey="swapAmount" ns="swap.step" />
                <IconInput
                  icon={MaticCoinIcon}
                  label="MATIC"
                  placeholder={`${amountIn}`}
                  isError={isError}
                  onChange={(e) => {
                    const value = parseFloat(e.currentTarget.value)
                    console.log('value', value)
                    setAmount(value || 0)
                  }}
                />
                <ExchangeRate
                  amountIn={amountIn}
                  amountOut={Number(
                    formatEther({ wei: amountOut, precision: 2 })
                  )}
                />
                <div>
                  <Button
                    buttonStyle="solid"
                    className="mt-10 text-white px-9 py-4 text-button-large"
                    disabled={isError}
                    onClick={handleSwapButtonClick}
                  >
                    <Trans i18nKey="swapButtonText" ns="swap.step" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export const SwapTokens = ({
  goToNextStep,
  setPlacement,
  placement,
}: {
  goToNextStep: () => void
  setPlacement: (p: 'inside' | 'outside') => void
  placement: 'inside' | 'outside'
}) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  window.gtns = goToNextStep
  const { chain } = useNetwork()

  if (!chain?.id) {
    throw new Error('Chain id is not defined')
  }

  const [amountOut, setAmountOut] = useState<bigint>(0n)

  const [showContent, setShowContent] = useState(false)

  const nativeToken = getNativeToken(chain.id)

  const minimalAmount = settings.minimalSwap[nativeToken]

  const [amount, setAmount] = useState(minimalAmount)

  // debounce to prevent too many preparations
  const debouncedAmount = useDebounce<number>(amount, 500)

  const [done, setDone] = useState(false)

  const { data: amountsOut, setAmountIn, isError, isLoading } = useSwapOut()

  useEffect(() => {
    if (!isError && !isLoading) {
      setAmountOut(amountsOut?.[1] || 0n)
    }
  }, [isError, isLoading, amountsOut])

  useEffect(() => {
    setAmountIn(parseUnits(debouncedAmount.toString(), 18))
  }, [debouncedAmount, setAmountIn])

  const {
    swap,
    isSuccess,
    isError: isSwapError,
  } = useSwapEthForGlm({
    value: parseUnits(debouncedAmount.toString(), 18),
  })

  useEffect(() => {
    if (isSuccess && !done) {
      setDone(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess])

  // const sliderProps = {
  //   min: 0,
  //   step: 0.01,
  //   max: parseFloat(formatEther({ wei: balance.NATIVE || 0n })),
  //   label: '',
  //   value: amount,
  //   displayValue: (v: number) => `Swap ${v} Matic`,
  //   onChange: (e: ChangeEvent<HTMLInputElement>) => {
  //     const value = parseFloat(e.currentTarget.value)
  //     setAmount(value)
  //   },
  // }

  return (
    <SwapTokensPresentational
      onSwapButtonClick={async () => {
        swap?.()
      }}
      amountOut={amountOut}
      showContent={showContent}
      setShowContent={setShowContent}
      setPlacement={setPlacement}
      placement={placement}
      setAmount={setAmount}
      amountIn={amount}
      isError={isSwapError}
    />
  )
}
