// components/welcome/intro.tsx
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import {
  RampInstantSDK,
  RampInstantEventTypes,
} from '@ramp-network/ramp-instant-sdk'
// import { debug } from 'debug'
import { useAccount } from 'hooks/useAccount'
import { useNetwork } from 'hooks/useNetwork'
import { extractBaseURL } from 'utils/extractBaseURL'
import { TooltipProvider } from 'components/providers/Tooltip.provider'
import { Button, Trans } from 'components/atoms'
import { useBalance } from 'hooks/useBalance'
import { RecommendationCardOnRamp } from 'components/molecules/recommendationCard/RecommendationCard'
import { BudgetOption } from 'types/dataContext'
import { useOnboarding } from 'hooks/useOnboarding'
import { settings } from 'settings'
import { AnimatedText } from 'components/molecules/animateText/AnimatedText'
import { Commands } from 'state/commands'
import { formatEther } from 'utils/formatEther'

import { Chain } from 'types/wagmi'
import { AwaitTransaction } from 'components/molecules/awaitTransaction/AwaitTransaction'

//@ts-ignore

// const log = debug('onboarding:steps:onramp')

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

export const OnRampTitleComponent = (visibility: 'hidden' | 'visible') => {
  const { chain } = useNetwork()
  return (
    <>
      <AnimatedText
        visibility={visibility}
        i18nKey="title"
        ns="onRamp.step"
        values={{ chain: chain?.name }}
      />
    </>
  )
}

const StartOnRampButton = ({
  onClick,
  showRamp,
  chain,
}: {
  showRamp: boolean
  onClick: (show: boolean) => void
  chain: Chain
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
        transition={{ duration: 1 }}
        className="w-full flex flex-col col-span-2 gap-4"
      >
        <div className="flex w-full justify-center text-h4 text-primary">
          <Trans
            i18nKey="getMatic"
            ns="onRamp.step"
            values={{
              chain: chain.name,
              token: chain.nativeCurrency.symbol,
            }}
          />
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
  showRecommendation,
  showLoader,
  onClick,
  chain,
}: {
  showRamp: boolean
  showRecommendation: boolean
  showLoader: boolean
  onClick: (show: boolean) => void
  chain: Chain
}) => {
  return (
    <>
      {showLoader && <AwaitTransaction mode="transaction" />}
      {showRamp ? (
        <div className="flex flex-col">
          <div className="grid grid-cols-4">
            <div className="col-span-2 col-start-2">
              {showRecommendation ? <RecommendationCardOnRamp /> : ''}
            </div>
          </div>
          <div
            id="rampContainer"
            style={{
              width: `895px`,
              height: '667px',
            }}
          >
            {' '}
          </div>
        </div>
      ) : (
        <StartOnRampButton
          chain={chain}
          onClick={onClick}
          showRamp={showRamp}
        />
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
  //@ts-ignore
  const { address } = useAccount(true)
  const widgetRef = useRef<RampInstantSDK | null>(null)
  const { chain } = useNetwork(true)
  const [showRamp, setShowRamp] = useState(placement === 'inside')
  const balance = useBalance()
  const initialBalance = useRef(balance.NATIVE)
  const { state, send } = useOnboarding()

  const showRecommendation = state.context.budget !== BudgetOption.CUSTOM
  const recommendedAmount = settings.budgetOptions[state.context.budget]
  const [showLoader, setShowLoader] = useState(false)

  const [transactionState, setTransactionState] = useState(
    TransactionState.PENDING
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
      const transferredAmount = balance.NATIVE - initialBalance.current
      send({
        type: Commands.BUY_NATIVE,
        //this is safe here no one buy that much MATIC
        payload: Number(
          formatEther({
            wei: transferredAmount,
            precision: 4,
          })
        ),
      })
      goToNextStep()
    }
  }, [balance, chain?.id])

  useEffect(() => {
    if (showRamp) {
      try {
        widgetRef.current = new RampInstantSDK({
          hostAppName: 'onboarding',
          hostLogoUrl: `${extractBaseURL(window.location.href)}/logo.svg`,
          hostApiKey: import.meta.env.VITE_RAMP_KEY,
          url: import.meta.env.VITE_RAMP_API_URL,
          swapAsset: 'MATIC_MATIC',
          fiatValue: recommendedAmount.toString(),
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

          widgetRef.current.on(RampInstantEventTypes.WIDGET_CLOSE, () => {
            if (transactionState === TransactionState.PENDING) {
              setShowLoader(true)
              setShowRamp(false)
            }
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
      showRecommendation={showRecommendation}
      showLoader={showLoader}
      onClick={() => {
        // setPlacement('inside')
        setShowRamp(true)
        // hideYagnaWalletCard()
      }}
      chain={chain}
    />
  )
}
