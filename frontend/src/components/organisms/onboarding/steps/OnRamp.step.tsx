// components/welcome/intro.tsx
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
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
import { TooltipProvider } from 'components/providers/Tooltip.provider'
import { Button, Trans } from 'components/atoms'
import { useTheme } from 'components/providers/ThemeProvider'
// import onboardingStyle from '../Onboarding.module.css'

TooltipProvider.registerTooltip({
  id: 'onRamp',
  tooltip: {
    sections: [
      'explainMatic',
      'whyMatic',
      'explainTransaction',
      'explainNative',
    ],
    appearance: 'primary',
  },
})

const log = debug('onboarding:steps:onramp')

enum TransactionState {
  READY,
  PENDING,
  COMPLETED,
}

export const OnRampTitleComponent = () => {
  const { chain } = useNetwork()
  return (
    <>
      <Trans i18nKey="title" ns="onRamp.step" values={{ chain: chain?.name }} />
    </>
  )
}

const StartOnRampButton = ({
  onClick,
  showRamp,
}: {
  showRamp: boolean
  onClick: (show: boolean) => void
}) => {
  return (
    <AnimatePresence>
      <motion.div
        variants={{
          open: { opacity: 1 },
          closed: { opacity: 0 },
          initial: { opacity: 0 },
        }}
        initial="initial"
        animate={showRamp ? 'closed' : 'open'}
        exit="closed"
        transition={{ duration: 4.2 }}
        className="w-full flex flex-col col-span-2 gap-4"
      >
        <div className="flex w-full justify-center text-h4 text-primary">
          <Trans i18nKey="getMatic" ns="onRamp.step" />
        </div>
        <div className="flex w-full justify-center">
          <Button
            buttonStyle="solid"
            className="px-9 py-4 text-button-large"
            onClick={() => {
              onClick(true)
            }}
          >
            <Trans i18nKey="start" ns="onRamp.step" />
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

const OnRampPresentational = ({
  showRamp,
  setShowRamp,
}: {
  showRamp: boolean
  setShowRamp: (show: boolean) => void
}) => {
  const theme = useTheme()
  const StepWithProgress = theme.getStepWithProgressTemplate()

  return (
    <>
      <StepWithProgress
        content={
          showRamp ? (
            <div
              id="rampContainer"
              style={{
                width: '895px',
                height: '590px',
              }}
            >
              {' '}
            </div>
          ) : (
            <StartOnRampButton onClick={setShowRamp} showRamp={showRamp} />
          )
        }
      ></StepWithProgress>
    </>
  )
  // return (
  //   <div className="text-center">
  //     <motion.h1
  //       className="text-4xl font-bold mb-4 text-gray-800"
  //       variants={variants}
  //     >
  //       Change fiat to crypto
  //     </motion.h1>
  //     <motion.p
  //       className="max-w-md text-gray-600 my-4 text-lg"
  //       variants={variants}
  //     ></motion.p>
  //     <motion.button
  //       className=" mt-4 px-4 py-2 text-white rounded bg-golemblue"
  //       variants={variants}
  //       onClick={() => {
  //         // goToNextStep()
  //       }}
  //       disabled={transactionState === TransactionState.PENDING}
  //     >
  //       {transactionState === TransactionState.PENDING ? (
  //         <div className="flex justify-center items-center ">
  //           <div className="relative">
  //             <div className="animate-spin ml-2 mr-2 h-6 w-6 rounded-full border-t-4 border-b-4 border-white"></div>
  //           </div>
  //         </div>
  //       ) : (
  //         'Next'
  //       )}
  //     </motion.button>
  //   </div>
  // )
}

export const OnRamp = () => {
  const { address } = useAccount()
  const widgetRef = useRef<RampInstantSDK | null>(null)
  const { chain } = useNetwork()
  const [done, setDone] = useState(false)
  const [showRamp, setShowRamp] = useState(false)
  const balance = useBalance(address)

  const [transactionState, setTransactionState] = useState(
    TransactionState.READY
  )

  //TODO use Option/Maybe for handling all those missing values

  if (!chain) {
    throw new Error('Chain not found')
  }

  useEffect(() => {
    if (
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

  useLayoutEffect(() => {
    if (address && !done && showRamp) {
      try {
        setDone(true)

        widgetRef.current = new RampInstantSDK({
          hostAppName: 'onboarding',
          hostLogoUrl: `${extractBaseURL(window.location.href)}logo.svg`,
          hostApiKey: import.meta.env.VITE_RAMP_KEY,
          url: import.meta.env.VITE_RAMP_API_URL,
          swapAsset: 'MATIC_MATIC',
          fiatValue: '10',
          fiatCurrency: 'USD',
          userAddress: address,
          defaultFlow: 'ONRAMP',
          variant: 'embedded-desktop',
          //@ts-ignore
          containerNode: document.getElementById('rampContainer'),
        })
        setTimeout(() => {
          widgetRef.current?.show()
        }, 500)
        widgetRef.current.on('*', (a) => {
          log('event', a)
        })
        widgetRef.current.on(
          RampInstantEventTypes.PURCHASE_CREATED,
          (event) => {
            log('purchase created', event)
            setTransactionState(TransactionState.PENDING)
          }
        )
      } catch (err) {
        console.error(err)
      }

      //Unfortunately there is no even on purchase failed and purchase success :(

      log('setting done')
    }

    hideRampBackground()
  }, [address, done, showRamp])

  return <OnRampPresentational showRamp={showRamp} setShowRamp={setShowRamp} />
}
