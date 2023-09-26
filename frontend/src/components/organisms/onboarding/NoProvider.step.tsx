import { useSDK } from '@metamask/sdk-react'
import { motion } from 'framer-motion'
import { MouseEventHandler } from 'react'
import { MetaMaskProvider } from '@metamask/sdk-react'
import { Step } from 'state/steps'
import onboardingStyle from './Onboarding.module.css'

const variants = {
  show: { opacity: 1 },
  hidden: { opacity: 0 },
}
const NoProviderPresentational = ({
  onClickOnboarding,
}: {
  onClickOnboarding: MouseEventHandler
}) => {
  return (
    <div className={onboardingStyle.step}>
      <motion.h1
        className={onboardingStyle.title}
        variants={variants}
        exit="hidden"
      >
        Metamask plugin not found
      </motion.h1>
      <motion.p
        className={onboardingStyle.description}
        variants={variants}
        exit="hidden"
      >
        Lets go through the onboarding process
      </motion.p>
      <motion.button
        className={onboardingStyle.button}
        variants={variants}
        onClick={onClickOnboarding}
        exit="hidden"
      >
        Go
      </motion.button>
    </div>
  )
}

//Metamask sdk is used here only to use install UI

const metaMaskSDKOptions = {
  logging: {
    developerMode: true,
  },
  checkInstallationImmediately: false,
  checkInstallationOnAllCalls: false,
  dappMetadata: {
    name: 'Golem onboarding',
    url: window.location.host,
  },
}

export const NoProvider = () => {
  const { sdk } = useSDK()

  const onClickOnboarding = () => {
    localStorage.setItem('OnboardingStep', Step.CONNECT_WALLET)
    sdk?.connect()
  }
  return <NoProviderPresentational onClickOnboarding={onClickOnboarding} />
}

export const NoProviderWrapped = () => {
  return (
    <MetaMaskProvider sdkOptions={metaMaskSDKOptions}>
      <NoProvider />
    </MetaMaskProvider>
  )
}
