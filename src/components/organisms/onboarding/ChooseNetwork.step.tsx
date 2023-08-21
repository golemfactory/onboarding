// components/welcome/intro.tsx
import { motion } from 'framer-motion'
import { OnboardingStep } from 'components/templates/OnboardingStep.template'
import { MouseEventHandler } from 'react'
import { useMetaMask } from 'hooks/useMetamask'

const variants = {
  show: { opacity: 1 },
  hidden: { opacity: 0 },
}
const ChooseNetworkPresentational = ({
  onConfirm,
}: {
  onConfirm: MouseEventHandler
}) => {
  const { wallet } = useMetaMask()

  console.log('wallet', wallet)
  return (
    <div className="text-center">
      <motion.h1
        className="text-4xl font-bold mb-4 text-gray-800"
        variants={variants}
      >
        Metamask plugin found
      </motion.h1>
      <motion.p
        className="max-w-md text-gray-600 my-4 text-lg"
        variants={variants}
      >
        Now choose network
      </motion.p>
      <motion.button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        variants={variants}
        onClick={(e) => {
          onConfirm(e)
        }}
      >
        Go
      </motion.button>
    </div>
  )
}

export const ChooseNetwork = ({
  onConfirm,
}: {
  onConfirm: MouseEventHandler
}) => {
  return (
    <OnboardingStep>
      <ChooseNetworkPresentational onConfirm={onConfirm} />
    </OnboardingStep>
  )
}
