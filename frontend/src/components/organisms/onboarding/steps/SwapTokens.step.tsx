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
import { parseUnits } from 'viem'

const SwapTokensPresentational = ({
  onSwapButtonClick,
  sliderProps,
  amountOut,
}: {
  onSwapButtonClick: () => void
  sliderProps: ISliderProps
  amountOut: bigint
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const [glmOut, setGlmOut] = useState('')

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

  return (
    <div className={onboardingStyle.step}>
      <motion.h1 className={onboardingStyle.title} variants={variants}>
        Swap tokens
      </motion.h1>
      <motion.div className={onboardingStyle.description} variants={variants}>
        You have only native tokens in your wallet. You need to swap them to
        have GLM
        <Slider {...sliderProps} />
      </motion.div>
      <motion.div className={onboardingStyle.description} variants={variants}>
        You will receive {glmOut} GLM
      </motion.div>
      <motion.button
        className={buttonStyle.primaryButton}
        variants={variants}
        onClick={handleSwapButtonClick}
        disabled={isLoading}
      >
        <div></div>
        {isLoading ? (
          <div className="flex justify-center items-center ">
            <div className="relative">
              <div className="animate-spin ml-2 mr-2 h-6 w-6 rounded-full border-t-4 border-b-4 border-white"></div>
            </div>
          </div>
        ) : (
          'Swap'
        )}
      </motion.button>
    </div>
  )
}

export const SwapTokens = () => {
  const { chain } = useNetwork()

  if (!chain?.id) {
    throw new Error('Chain id is not defined')
  }
  const balance = useBalance()

  const nativeToken = getNativeToken(chain.id)

  const minimalAmount = settings.minimalSwap[nativeToken]
  const [amount, setAmount] = useState(minimalAmount)

  // debounce to prevent too many preparations
  const debouncedAmount = useDebounce<number>(amount, 500)

  const [done, setDone] = useState(false)

  const { data: amountOut, setAmountIn } = useSwapOut()

  useEffect(() => {
    setAmountIn(parseUnits(debouncedAmount.toString(), 18))
  }, [debouncedAmount, setAmountIn])

  const { swap, isSuccess } = useSwapEthForGlm({
    value: parseUnits(debouncedAmount.toString(), 18),
  })

  useEffect(() => {
    if (isSuccess && !done) {
      setDone(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess])

  const sliderProps = {
    min: 0,
    step: 0.01,
    max: parseFloat(formatEther({ wei: balance.NATIVE || 0n })),
    label: '',
    value: amount,
    displayValue: (v: number) => `Swap ${v} Matic`,
    onChange: (e: ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(e.currentTarget.value)
      setAmount(value)
    },
  }

  return (
    <div>
      <SwapTokensPresentational
        sliderProps={sliderProps}
        onSwapButtonClick={async () => {
          swap?.()
        }}
        amountOut={amountOut?.[1]}
      />
    </div>
  )
}
