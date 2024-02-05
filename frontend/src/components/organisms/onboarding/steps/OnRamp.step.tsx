// components/welcome/intro.tsx
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import {
  RampInstantSDK,
  RampInstantEventTypes,
} from '@ramp-network/ramp-instant-sdk'
import { debug } from 'debug'
import { useAccount } from 'hooks/useAccount'
import { useNetwork } from 'hooks/useNetwork'
import { extractBaseURL } from 'utils/extractBaseURL'
import { TooltipProvider } from 'components/providers/Tooltip.provider'
import { Button, Trans } from 'components/atoms'
import { useBalance } from 'hooks/useBalance'

const log = debug('onboarding:steps:onramp')

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
  onClick,
}: {
  showRamp: boolean
  onClick: (show: boolean) => void
}) => {
  return (
    <>
      {showRamp ? (
        <div
          id="rampContainer"
          style={{
            width: `895px`,
            height: '667px',
          }}
        >
          {' '}
        </div>
      ) : (
        <StartOnRampButton onClick={onClick} showRamp={showRamp} />
      )}
    </>
  )
}

export const OnRamp = ({
  goToNextStep,
  placement,
}: {
  goToNextStep: () => void
  setPlacement: (x: 'inside' | 'outside') => void
  placement: 'inside' | 'outside'
}) => {
  const { address } = useAccount()
  const widgetRef = useRef<RampInstantSDK | null>(null)
  const { chain } = useNetwork()
  const [showRamp, setShowRamp] = useState(placement === 'inside')
  const balance = useBalance()
  const initialBalance = useRef(balance.NATIVE)

  const [transactionState, setTransactionState] = useState(
    TransactionState.READY
  )
  //TODO use Option/Maybe for handling all those missing values

  if (!chain) {
    throw new Error('Chain not found')
  }

  //we observe balance and once user gets tra
  useEffect(() => {
    if (
      transactionState === TransactionState.PENDING &&
      balance.NATIVE > initialBalance.current
    ) {
      log('going to next step')
      goToNextStep()
    }
  }, [balance, chain?.id])

  useEffect(() => {
    if (showRamp) {
      try {
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
          //well ramp is internally inconsistent...
          //@ts-ignore
          containerNode: document.getElementById('rampContainer'),
        })

        //check if there is no widget rendered already
        const hasChild =
          document?.getElementById('rampContainer')?.children.length
        if (!hasChild) {
          widgetRef.current.show()

          widgetRef.current.on(RampInstantEventTypes.PURCHASE_CREATED, () => {
            setTransactionState(TransactionState.PENDING)
          })
        }
      } catch (err) {
        console.error(err)
      }

      //Unfortunately there is no even on purchase failed and purchase success :(
    }
  }, [showRamp])

  return (
    <OnRampPresentational
      showRamp={showRamp}
      onClick={() => {
        // setPlacement('inside')
        setShowRamp(true)
        // hideYagnaWalletCard()
      }}
    />
  )
}
