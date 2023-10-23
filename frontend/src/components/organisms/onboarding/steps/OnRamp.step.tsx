// components/welcome/intro.tsx
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import {
  RampInstantSDK,
  RampInstantEventTypes,
} from '@ramp-network/ramp-instant-sdk'
import { hideRampBackground } from 'utils/hideRampBackground'
import { debug } from 'debug'
import { useAccount } from 'hooks/useAccount'
import { formatEther } from 'utils/formatEther'
import { settings } from 'settings'
import { useNetwork } from 'hooks/useNetwork'
import { useBalance } from 'hooks/useBalance'
import { getTokenByCategory } from 'utils/getTokenByNetwrok'
import { TokenCategory } from 'types/ethereum'
// import onboardingStyle from '../Onboarding.module.css'

const log = debug('onboarding:steps:onramp')

const variants = {
  show: { opacity: 1 },
  hidden: { opacity: 0 },
}

enum TransactionState {
  READY,
  PENDING,
  COMPLETED,
}

const OnRampPresentational = ({
  goToNextStep,
  transactionState,
}: {
  goToNextStep: () => void
  transactionState: TransactionState
}) => {
  return (
    <div className="text-center">
      <motion.h1
        className="text-4xl font-bold mb-4 text-gray-800"
        variants={variants}
      >
        Change fiat to crypto
      </motion.h1>
      <motion.p
        className="max-w-md text-gray-600 my-4 text-lg"
        variants={variants}
      ></motion.p>
      <motion.button
        className=" mt-4 px-4 py-2 text-white rounded bg-golemblue"
        variants={variants}
        onClick={() => {
          goToNextStep()
        }}
        disabled={transactionState === TransactionState.PENDING}
      >
        {transactionState === TransactionState.PENDING ? (
          <div className="flex justify-center items-center ">
            <div className="relative">
              <div className="animate-spin ml-2 mr-2 h-6 w-6 rounded-full border-t-4 border-b-4 border-white"></div>
            </div>
          </div>
        ) : (
          'Next'
        )}
      </motion.button>
    </div>
  )
}

export const OnRamp = ({ goToNextStep }: { goToNextStep: () => void }) => {
  const { address } = useAccount()
  const widgetRef = useRef<RampInstantSDK | null>(null)
  const balance = useBalance()
  const { chain } = useNetwork()

  const [transactionState, setTransactionState] = useState(
    TransactionState.READY
  )

  //TODO use Option/Maybe for handling all those missing values

  if (!chain) {
    throw new Error('Chain not found')
  }

  const [done, setDone] = useState(false)

  useEffect(() => {
    if (
      balance.NATIVE &&
      parseFloat(formatEther({ wei: balance.NATIVE, precision: 4 })) >
        settings.minimalBalance[
          getTokenByCategory(chain?.id, TokenCategory.NATIVE)
        ]
    ) {
      setTransactionState(TransactionState.COMPLETED)
      // maybe we should better render there a button that redirects to next step
      // instead of automatically redirect

      try {
        widgetRef.current?.close()
      } catch (err) {
        debug(err)
      }
    }
  }, [balance])

  useEffect(() => {
    if (address && !done) {
      setDone(true)

      debug('creating widget')
      widgetRef.current = new RampInstantSDK({
        hostAppName: 'onboarding',
        hostLogoUrl: `${window.location.origin}/onboarding_staging/logo.svg`,
        hostApiKey: '6v7ycp5tmgxzr2rjp29caovrm6wasx6527zeybyp',
        url: 'https://app.ramp.network',
        fiatValue: '6',
        fiatCurrency: 'EUR',
        userAddress: address,
        defaultFlow: 'ONRAMP',
      })

      //TODO : fix this
      setTimeout(() => {
        widgetRef.current?.show()
      }, 0)

      //Unfortunately there is no even on purchase failed and purchase success :(

      widgetRef.current.on(RampInstantEventTypes.PURCHASE_CREATED, (event) => {
        log('purchase created', event)
        setTransactionState(TransactionState.PENDING)
      })

      log('setting done')
    }

    hideRampBackground()
  }, [address, done, goToNextStep, widgetRef])

  return (
    <OnRampPresentational
      goToNextStep={goToNextStep}
      transactionState={transactionState}
    />
  )
}
