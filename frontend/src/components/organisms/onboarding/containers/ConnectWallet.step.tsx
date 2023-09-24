// components/welcome/intro.tsx
import { motion } from 'framer-motion'
import { MouseEventHandler, useEffect, useState } from 'react'
import { useMetaMask } from 'components/providers/MetamaskProvider'

export const ConnectWallet = ({ goToNextStep }: { goToNextStep: () => {} }) => {
  const metaMask = useMetaMask()
  const [done, setDone] = useState(false)
  useEffect(() => {
    if (!done && metaMask.wallet.accounts.length > 0) {
      goToNextStep()
      setDone(true)
    }
  }, [metaMask.wallet])
  return <ConnectWalletPresentational onConfirm={() => metaMask.connect()} />
}
