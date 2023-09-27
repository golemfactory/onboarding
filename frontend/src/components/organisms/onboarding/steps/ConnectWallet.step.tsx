// components/welcome/intro.tsx
import { motion } from 'framer-motion'
import { MouseEventHandler, useEffect, useState } from 'react'
import { useMetaMask } from 'hooks/useMetamask'

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
        className="text-4xl font-bold mb-4 text-black"
        variants={variants}
      >
        Wallet connection
      </motion.h1>
      <motion.p
        className="max-w-md text-black my-4 text-xl"
        variants={variants}
      >
        We detected you have Metamask installed but it is not connected
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
  goToNextStep,
}: {
  goToNextStep: () => void
}) => {
  const metaMask = useMetaMask()
  console.log('metamask', metaMask)
  const [done, setDone] = useState(false)
  useEffect(() => {
    if (!done && metaMask.wallet.accounts.length > 0) {
      goToNextStep()
      setDone(true)
    }
  }, [metaMask.wallet])
  return <ConnectWalletPresentational onConfirm={() => metaMask.connect()} />
}
