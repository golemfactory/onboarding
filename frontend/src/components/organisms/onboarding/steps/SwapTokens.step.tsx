// components/welcome/intro.tsx
import { useDebounce } from 'usehooks-ts'
import { settings } from 'settings'
import { getNativeToken } from 'utils/getNativeToken'
import { useSwapOut } from 'hooks/useSwapOut'
import { useEffect, useState } from 'react'
import { useNetwork } from 'hooks/useNetwork'
import { useSwapEthForGlm } from 'hooks/useSwapEthForGlm'
import { formatEther } from 'utils/formatEther'
import { parseUnits } from 'viem'
import { TooltipProvider } from 'components/providers/Tooltip.provider'
import { IconInput } from 'components/atoms/iconInput/IconInput'
import { MaticCoinIcon } from 'components/atoms/icons'
import { StartButton } from 'components/molecules/stepStartButton/StepStartButton'
import { RecommendationCardSwap } from 'components/molecules/recommendationCard/RecommendationCard'
import { Button, Trans } from 'components/atoms'
import { ExchangeRate } from 'components/molecules/exchangeRate/exchangeRate'
import { AwaitTransaction } from 'components/molecules/awaitTransaction/AwaitTransaction'
import { useOnboarding } from 'hooks/useOnboarding'
import { Commands } from 'state/commands'
import debug from 'debug'

const log = debug('onboarding:steps:swap')

TooltipProvider.registerTooltip({
  id: 'swap',
  tooltip: {
    sections: ['explainGLMAmount', 'explainRecommendation'],
    appearance: 'primary',
  },
})

const SwapTokensPresentational = ({
  handleSwapButtonClick,
  setPlacement,
  amountOut,
  showContent,
  setShowContent,
  setAmount,
  amountIn,
  isError,
  isWaitingForConfirmation,
  isWaitingForTransaction,
}: {
  handleSwapButtonClick: () => void
  amountOut: bigint
  showContent: boolean
  setShowContent: (show: boolean) => void
  setPlacement: (p: 'inside' | 'outside') => void
  setAmount: (amount: number) => void
  amountIn: number
  isError: boolean
  isWaitingForConfirmation: boolean
  isWaitingForTransaction: boolean
}) => {
  // const [isLoading, setIsLoading] = useState(false)

  return (
    <div>
      {!showContent && (
        <StartButton
          onClick={() => {
            setShowContent(true)
          }}
          step="swap"
        />
      )}

      {showContent && (
        <div className="flex flex-col gap-6 pb-8">
          {isWaitingForConfirmation || isWaitingForTransaction ? (
            <AwaitTransaction
              mode={isWaitingForConfirmation ? 'confirmation' : 'transaction'}
            />
          ) : (
            <>
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
            </>
          )}
        </div>
      )}
    </div>
  )
}

export const SwapTokens = ({ goToNextStep }: { goToNextStep: () => void }) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  window.gtns = goToNextStep
  const { chain } = useNetwork()

  if (!chain?.id) {
    throw new Error('Chain id is not defined')
  }

  const [isWaitingForConfirmation, setIsWaitingForConfirmation] =
    useState(false)

  const { send } = useOnboarding()

  const [amountOut, setAmountOut] = useState<bigint>(0n)

  const [showContent, setShowContent] = useState(false)

  const nativeToken = getNativeToken(chain.id)

  const minimalAmount = settings.minimalSwap[nativeToken]

  const [amount, setAmount] = useState(minimalAmount)

  // debounce to prevent too many preparations
  const debouncedAmount = useDebounce<number>(amount, 500)

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
    isSuccess: isSwapSuccess,
    isError: isSwapError,
    isLoading: isSwapLoading,
  } = useSwapEthForGlm({
    value: parseUnits(debouncedAmount.toString(), 18),
  })

  useEffect(() => {
    if (isSwapSuccess) {
      log('swap success')
      send({
        type: Commands.BUY_GLM,
        payload: Number(
          formatEther({
            wei: amountOut,
            precision: 2,
          })
        ),
      })
      goToNextStep()
    }
  }, [isSwapSuccess, goToNextStep])

  const handleSwapButtonClick = async () => {
    await swap?.()
    setIsWaitingForConfirmation(true)
  }

  useEffect(() => {
    setIsWaitingForConfirmation(false)
  }, [isSwapLoading])
  return (
    <SwapTokensPresentational
      handleSwapButtonClick={handleSwapButtonClick}
      amountOut={amountOut}
      showContent={showContent}
      setShowContent={setShowContent}
      setAmount={setAmount}
      amountIn={amount}
      isError={isSwapError}
      isWaitingForConfirmation={isWaitingForConfirmation}
      isWaitingForTransaction={isSwapLoading}
    />
  )
}
