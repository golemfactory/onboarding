import { LoadingSpinner } from 'components/atoms/loadingSpinner'
import { Step, StepType } from '../../../state/steps'
import {
  Welcome,
  ConnectWallet,
  ChooseNetwork,
  OnRamp,
  SwapTokens,
  Finish,
  AddGLM,
  Transfer,
  OnRampTitleComponent,
} from 'components/organisms/onboarding'

import { ComponentType, PropsWithChildren } from 'react'
import { TokensOrnament } from 'components/atoms/ornaments/tokens'
import { WalletIconGreen } from 'components/atoms/ornaments/walletIconGreen'
import { StepWithProgress } from 'components/templates/themes/defaultTheme/StepWithProgress'
import { StepTemplate } from 'components/templates/themes/defaultTheme/Step.template'
import { motion } from 'framer-motion'

const componentByStep: Record<
  StepType,
  {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component: ComponentType<any>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    layout?: ComponentType<any>
    placement: 'inside' | 'outside'
    ornament?: ComponentType<unknown>
    showNextButton?: boolean
    title?: ComponentType<Record<string, never>>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    parentLayout?: ComponentType<any>
  }
> = {
  [Step.WELCOME]: {
    component: Welcome,
    placement: 'outside',
    showNextButton: true,
  },
  [Step.CONNECT_WALLET]: {
    component: ConnectWallet,
    placement: 'inside',
    ornament: () => {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 1,
            duration: 2,
          }}
        >
          <TokensOrnament />
        </motion.div>
      )
    },
  },
  [Step.CHOOSE_NETWORK]: {
    component: ChooseNetwork,
    placement: 'inside',
    ornament: WalletIconGreen,
  },
  [Step.ON_RAMP]: {
    component: OnRamp,
    placement: 'outside',
    title: OnRampTitleComponent,
    layout: StepWithProgress,
  },
  [Step.SWAP]: {
    component: SwapTokens,
    placement: 'outside',
    layout: StepWithProgress,
  },
  [Step.FINISH]: {
    component: Finish,
    placement: 'outside',
    parentLayout: ({ main: Main }: { main: ComponentType }) => {
      return <Main />
    },
  },
  [Step.ADD_GLM]: { component: AddGLM, placement: 'outside' },
  [Step.TRANSFER]: {
    component: Transfer,
    placement: 'outside',
    layout: StepWithProgress,
  },
  [Step.CHECK_ACCOUNT_BALANCES]: {
    component: LoadingSpinner,
    placement: 'inside',
  },
  [Step.GASLESS_SWAP]: { component: LoadingSpinner, placement: 'inside' },
}

const DefaultLayout = ({ children }: PropsWithChildren<unknown>) => {
  return <>{children}</>
}
export const getStepDetails = (step: StepType) => {
  const details = componentByStep[step]
  const ParentTemplate = details.parentLayout || StepTemplate
  const props = {
    //i18n namespace
    name: step,
    main: details.component,
    placement: details.placement,
    ornament: details.ornament,
    showNextButton: details.showNextButton || false,
    title: details.title,
    layout: details.layout || DefaultLayout,
  }

  return <ParentTemplate {...props} />
}
