// components/welcome/intro.tsx
import { motion } from 'framer-motion'
import { OnboardingStep } from 'components/templates/OnboardingStep.template'
import { FC, MouseEventHandler } from 'react'

const variants = {
  show: { opacity: 1 },
  hidden: { opacity: 0 },
}
const ConnectWalletPresentational = ({
  onConfirm,
}: {
  onConfirm: MouseEventHandler
}) => {
  return (
    <div className="text-center">
      <motion.h1
        className="text-4xl font-bold mb-4 text-gray-800"
        variants={variants}
      >
        Wallet connection
      </motion.h1>
      <motion.p
        className="max-w-md text-gray-600 my-4 text-lg"
        variants={variants}
      >
        First you need to connect your wallet to be able to use GLM tokens.
      </motion.p>
      <motion.button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        variants={variants}
        onClick={(e) => {
          onConfirm(e)
        }}
      >
        Connect wallet
      </motion.button>
    </div>
  )
}

export const ConnectWallet = ({
  onConfirm,
}: {
  onConfirm: MouseEventHandler
}) => {
  return (
    <OnboardingStep>
      <ConnectWalletPresentational onConfirm={onConfirm} />
    </OnboardingStep>
  )
}
