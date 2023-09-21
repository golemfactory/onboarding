// components/welcome/intro.tsx
import { motion } from 'framer-motion'
import { MouseEventHandler } from 'react'
import { MetaMaskProvider } from '@metamask/sdk-react'

const variants = {
  show: { opacity: 1 },
  hidden: { opacity: 0 },
}
const FinishPresentational = ({ onConfirm }: { onConfirm: MouseEventHandler }) => {
  return (
    <div className="text-center">
      <motion.h1 className="text-4xl font-bold mb-4 text-white" variants={variants}>
        All good
      </motion.h1>
      <motion.p className="max-w-md text-white my-4 text-xl" variants={variants}>
        You are ready to use Golem network now
      </motion.p>
      {/* <motion.button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        variants={variants}
        onClick={(e) => {
          onConfirm(e)
        }}
      >
        Get Started
      </motion.button> */}
    </div>
  )
}

export const Finish = ({ goToNextStep }: { goToNextStep: MouseEventHandler }) => {
  return <FinishPresentational onConfirm={goToNextStep} />
}
