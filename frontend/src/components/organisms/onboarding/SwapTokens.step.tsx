// components/welcome/intro.tsx
import { motion } from 'framer-motion'
import { MouseEventHandler } from 'react'
import { useSDK } from '@metamask/sdk-react'

import { swapETHForGLM } from 'ethereum/actions/swap'
import { parseUnits } from 'ethers'
import { settings } from 'settings'
import { getNativeToken } from 'utils/getNativeToken'

const variants = {
  show: { opacity: 1 },
  hidden: { opacity: 0 },
}
const SwapTokensPresentational = ({ onSwapButtonClick }: { onSwapButtonClick: MouseEventHandler }) => {
  return (
    <div className="text-center">
      <motion.h1 className="text-4xl font-bold mb-4 text-white" variants={variants}>
        Swap tokens
      </motion.h1>
      <motion.p className="max-w-md text-white my-4 text-xl" variants={variants}>
        You have only native tokens in your wallet. You need to swap them to have GLM
      </motion.p>
      <motion.button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        variants={variants}
        onClick={onSwapButtonClick}
      >
        Swap
      </motion.button>
    </div>
  )
}

export const SwapTokens = ({ goToNextStep }: { goToNextStep: () => {} }) => {
  console.log('SwapTokens')
  return (
    <SwapTokensPresentational
      onSwapButtonClick={async () => {
        const nativeToken = await getNativeToken()
        await swapETHForGLM({
          value: parseUnits(settings.minimalSwap[nativeToken], 18),
        })
        goToNextStep()
      }}
    />
  )
}
