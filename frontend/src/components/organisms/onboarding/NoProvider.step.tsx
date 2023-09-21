import { useSDK } from '@metamask/sdk-react'
import { motion } from 'framer-motion'
import { MouseEventHandler } from 'react'
import { MetaMaskProvider } from '@metamask/sdk-react'
import { Step } from 'state/steps'
const variants = {
  show: { opacity: 1 },
  hidden: { opacity: 0 },
}
const NoProviderPresentational = ({ onClickOnboarding }: { onClickOnboarding: MouseEventHandler }) => {
  return (
    <div className="text-center">
      <motion.h1 className="text-4xl font-bold mb-4 text-white" variants={variants} exit="hidden">
        Metamask plugin not found
      </motion.h1>
      <motion.p className="max-w-md text-white my-4 text-xl" variants={variants} exit="hidden">
        Lets go through the onboarding process
      </motion.p>
      <motion.button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
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
