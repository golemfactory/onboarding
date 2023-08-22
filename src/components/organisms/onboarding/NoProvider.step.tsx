// components/welcome/intro.tsx
import { motion } from 'framer-motion'
import { OnboardingStep } from 'components/templates/OnboardingStep.template'
import { MouseEventHandler, useEffect, useRef, useState } from 'react'
import MetaMaskOnboarding from '@metamask/onboarding'

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

export const NoProvider = () => {
  const [accounts, setAccounts] = useState<string[]>([])
  const onboarding = useRef<MetaMaskOnboarding>()

  //keep reference to onboarding
  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding()
    }
  }, [])

  //track accounts and if one is added stop onboarding
  useEffect(() => {
    console.log('accounts', accounts)
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (accounts.length > 0) {
        if (onboarding.current) {
          console.log('stop onboarding')
          onboarding.current.stopOnboarding()
        }
      }
    }
  }, [accounts])

  useEffect(() => {
    function handleNewAccounts(newAccounts: string[]) {
      console.log('setting accounts', newAccounts)
      setAccounts(newAccounts)
    }
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((accounts) => {
          console.log('accountsss', accounts)
          if (Array.isArray(accounts)) {
            handleNewAccounts(accounts)
          }
        })
      window.ethereum.on('accountsChanged', handleNewAccounts)
      return () => {
        window.ethereum.removeListener('accountsChanged', handleNewAccounts)
      }
    }
  }, [])

  const onClickOnboarding = () => {
    if (onboarding.current) {
      onboarding.current.startOnboarding()
    }
  }

  return (
    <OnboardingStep>
      <NoProviderPresentational onClickOnboarding={onClickOnboarding} />
    </OnboardingStep>
  )
}
