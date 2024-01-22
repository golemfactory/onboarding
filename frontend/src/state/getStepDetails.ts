import { LoadingSpinner } from 'components/atoms/loadingSpinner'
import { Step, StepType } from './steps'
import {
  Welcome,
  ConnectWallet,
  ChooseNetwork,
  OnRamp,
  SwapTokens,
  Finish,
  AddGLM,
  Transfer,
} from 'components/organisms/onboarding'

import { ComponentType } from 'react'

const componentByStep: Partial<
  Record<
    StepType,
    {
      component: ComponentType<{
        setIsCompleted: (isCompleted: boolean) => void
        isNextCalled: boolean
      }>
      placement: 'inside' | 'outside'
    }
  >
> = {
  [Step.WELCOME]: { component: Welcome, placement: 'outside' },
  [Step.CONNECT_WALLET]: {
    component: ConnectWallet,
    placement: 'inside',
  },
  [Step.CHOOSE_NETWORK]: { component: ChooseNetwork, placement: 'outside' },
  [Step.ON_RAMP]: { component: OnRamp, placement: 'outside' },
  [Step.DETECT_METAMASK]: { component: LoadingSpinner, placement: 'outside' },
  [Step.SWAP]: { component: SwapTokens, placement: 'outside' },
  [Step.FINISH]: { component: Finish, placement: 'outside' },
  [Step.ADD_GLM]: { component: AddGLM, placement: 'outside' },
  [Step.TRANSFER]: { component: Transfer, placement: 'outside' },
}

export const getStepDetails = (step: StepType) => {
  const details = componentByStep[step]
  return {
    //i18n namespace
    name: step,
    component: details?.component,
    placement: details?.placement,
  }
}
