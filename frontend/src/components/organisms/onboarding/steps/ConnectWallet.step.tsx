// components/welcome/intro.tsx
import { motion } from 'framer-motion'
import { MouseEventHandler, useEffect, useState } from 'react'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAccount } from 'hooks/useAccount'
import { Step } from 'state/steps'

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
        We need you to connect your wallet to continue
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
  const { open } = useWeb3Modal()
  const { address } = useAccount()

  const [done, setDone] = useState(false)

  useEffect(() => {
    if (done && address) {
      goToNextStep()
    }
  }, [done, address])

  return (
    <ConnectWalletPresentational
      onConfirm={() => {
        setDone(true)
        open()
        localStorage.setItem('OnboardingStep', Step.CONNECT_WALLET)
      }}
    />
  )
}

// const waitForAddressAndContinue = ( goToNextStep : () => void) => {
//   const { address } = useAccount()
//   useEffect(() => {
//     if (address) {
//       goToNextStep()
//     }
//   }, [address])
// }
