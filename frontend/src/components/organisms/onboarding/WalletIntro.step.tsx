// components/welcome/intro.tsx
import { motion } from 'framer-motion'
import { MouseEventHandler } from 'react'

const variants = {
  show: { opacity: 1 },
  hidden: { opacity: 0 },
}
const WalletIntroPresentational = ({ onConfirm }: { onConfirm: MouseEventHandler }) => {
  return (
    <div className="text-center">
      <motion.h1 className="text-4xl font-bold mb-4 text-gray-800" variants={variants}>
        Metamask connection
      </motion.h1>
      <motion.p className="max-w-md text-gray-600 my-4 text-lg" variants={variants}>
        First you need to make sure you have Metamask wallet installed and connected
      </motion.p>
      <motion.button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        variants={variants}
        onClick={(e) => {
          onConfirm(e)
        }}
      >
        Continue
      </motion.button>
    </div>
  )
}

export const WalletIntro = ({ goToNextStep }: { goToNextStep: MouseEventHandler }) => {
  return <WalletIntroPresentational onConfirm={goToNextStep} />
}
