// // components/welcome/intro.tsx
// import { MouseEventHandler, useEffect, useState } from 'react'
// import { useWeb3Modal } from '@web3modal/wagmi/react'
// import { useAccount } from 'hooks/useAccount'
// import { Step } from 'state/steps'
import onboardingStyle from '../Onboarding.module.css'

const ConnectWalletPresentational = () => {
  return <div className={onboardingStyle.step}>DUPA</div>
}

export const ConnectWallet = () => {
  // const { open } = useWeb3Modal()

  return <ConnectWalletPresentational />
}
