// components/welcome/intro.tsx
import { motion } from 'framer-motion'

import { swapETHForGLM } from 'ethereum/actions/swap'
import { parseUnits } from 'ethers'
import { settings } from 'settings'
import { getNativeToken } from 'utils/getNativeToken'
import onboardingStyle from '../Onboarding.module.css'

import buttonStyle from 'components/atoms/button/button.module.css'
const variants = {
  show: { opacity: 1 },
  hidden: { opacity: 0 },
}
import { useState } from 'react'

const SwapTokensPresentational = ({
  onSwapButtonClick,
}: {
  onSwapButtonClick: () => void
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleSwapButtonClick = async () => {
    setIsLoading(true)
    await onSwapButtonClick()
  }

  return (
    <div className={onboardingStyle.step}>
      <motion.h1 className={onboardingStyle.title} variants={variants}>
        Swap tokens
      </motion.h1>
      <motion.p className={onboardingStyle.description} variants={variants}>
        You have only native tokens in your wallet. You need to swap them to
        have GLM
      </motion.p>
      <motion.button
        className={buttonStyle.primaryButton}
        variants={variants}
        onClick={handleSwapButtonClick}
        disabled={isLoading}
      >
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

export const SwapTokens = ({ goToNextStep }: { goToNextStep: () => void }) => {
  return (
    <SwapTokensPresentational
      onSwapButtonClick={async () => {
        const nativeToken = await getNativeToken()
        const transaction = await swapETHForGLM({
          value: parseUnits(settings.minimalSwap[nativeToken], 18),
        })
        await transaction.wait()
        goToNextStep()
      }}
    />
  )
}
