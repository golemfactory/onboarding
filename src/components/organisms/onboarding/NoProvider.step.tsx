// components/welcome/intro.tsx
import { motion } from 'framer-motion'
import { OnboardingStep } from 'components/templates/OnboardingStep.template'
import { MouseEventHandler } from 'react'

const variants = {
  show: { opacity: 1 },
  hidden: { opacity: 0 },
}
const NoProviderPresentational = ({
  onConfirm,
}: {
  onConfirm: MouseEventHandler
}) => {
  return (
    <div className="text-center">
      <motion.h1
        className="text-4xl font-bold mb-4 text-gray-800"
        variants={variants}
        exit="hidden"
      >
        Metamask plugin not found
      </motion.h1>
      <motion.p
        className="max-w-md text-gray-600 my-4 text-lg"
        variants={variants}
        exit="hidden"
      >
        Please install Metamask to continue.
      </motion.p>
      <motion.button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        variants={variants}
        onClick={(e) => {
          onConfirm(e)
        }}
        exit="hidden"
      >
        Go
      </motion.button>
    </div>
  )
}

export const NoProvider = ({ onConfirm }: { onConfirm: MouseEventHandler }) => {
  return (
    <OnboardingStep>
      <NoProviderPresentational onConfirm={onConfirm} />
    </OnboardingStep>
  )
}
