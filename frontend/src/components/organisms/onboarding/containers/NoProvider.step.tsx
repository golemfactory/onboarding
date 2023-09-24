import { useSDK } from '@metamask/sdk-react'
import { motion } from 'framer-motion'
import { MouseEventHandler } from 'react'
import { MetaMaskProvider } from '@metamask/sdk-react'
import { Step } from 'state/steps'
const variants = {
  show: { opacity: 1 },
  hidden: { opacity: 0 },
}

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

export const NoProviderWrapped = ({ goToNextStep }: { goToNextStep: () => {} }) => {
  return (
    <MetaMaskProvider sdkOptions={metaMaskSDKOptions}>
      <NoProvider goToNextStep={goToNextStep} />
    </MetaMaskProvider>
  )
}

export const NoProvider = ({ goToNextStep }: { goToNextStep: () => {} }) => {
  const { sdk } = useSDK()

  const onClickOnboarding = () => {
    localStorage.setItem('OnboardingStep', Step.CONNECT_WALLET)
    sdk?.connect()
  }
  return <NoProviderPresentational onClickOnboarding={onClickOnboarding} />
}
