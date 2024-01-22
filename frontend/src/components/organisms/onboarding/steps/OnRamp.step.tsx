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
import { extractBaseURL } from 'utils/extractBaseURL'
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
  transactionState,
}: {
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
          // goToNextStep()
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

export const OnRamp = () => {
  const { address } = useAccount()
  const widgetRef = useRef<RampInstantSDK | null>(null)
  const balance = useBalance()
  const { chain } = useNetwork()
  const [done, setDone] = useState(false)

  const [transactionState, setTransactionState] = useState(
    TransactionState.READY
  )

  //TODO use Option/Maybe for handling all those missing values

  if (!chain) {
    throw new Error('Chain not found')
  }

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
        widgetRef.current?.close()
      } catch (err) {
        debug(err)
      }
    }
  }, [balance, chain?.id])

  useEffect(() => {
    if (address && !done) {
      try {
        widgetRef.current = new RampInstantSDK({
          hostAppName: 'onboarding',
          hostLogoUrl: `${extractBaseURL(window.location.href)}logo.svg`,
          hostApiKey: import.meta.env.VITE_RAMP_KEY,
          url: import.meta.env.VITE_RAMP_API_URL,
          swapAsset: 'MATIC_MATIC',
          fiatValue: '10',
          fiatCurrency: 'EUR',
          userAddress: address,
          defaultFlow: 'ONRAMP',
        })
        console.log('twice', done)

        setTimeout(() => {
          if (!done) {
            widgetRef.current?.show()
            setDone(true)
          }
        }, 500)
        widgetRef.current.on(
          RampInstantEventTypes.PURCHASE_CREATED,
          (event) => {
            log('purchase created', event)
            setTransactionState(TransactionState.PENDING)
          }
        )
      } catch (err) {}

      //Unfortunately there is no even on purchase failed and purchase success :(

      log('setting done')
    }

    hideRampBackground()
  }, [address])

  return <OnRampPresentational transactionState={transactionState} />
}
