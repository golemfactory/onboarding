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
} from 'components/organisms/onboarding'

import { ComponentType } from 'react'
import { StepRenderDetailsType } from 'types/ui'
import { TokensOrnament } from 'components/atoms/ornaments/tokens'

const componentByStep: Record<
  StepType,
  {
    component: ComponentType<{
      setIsCompleted: (isCompleted: boolean) => void
      isNextCalled: boolean
    }>
    placement: 'inside' | 'outside'
    ornament?: ComponentType<Record<string, never>>
    showNextButton?: boolean
  }
> = {
  [Step.WELCOME]: { component: Welcome, placement: 'outside' },
  [Step.CONNECT_WALLET]: {
    component: ConnectWallet,
    placement: 'inside',
    ornament: TokensOrnament,
  },
  [Step.CHOOSE_NETWORK]: { component: ChooseNetwork, placement: 'outside' },
  [Step.ON_RAMP]: { component: OnRamp, placement: 'outside' },
  [Step.SWAP]: { component: SwapTokens, placement: 'outside' },
  [Step.FINISH]: { component: Finish, placement: 'outside' },
  [Step.ADD_GLM]: { component: AddGLM, placement: 'outside' },
  [Step.TRANSFER]: { component: Transfer, placement: 'outside' },
  [Step.CHECK_ACCOUNT_BALANCES]: {
    component: LoadingSpinner,
    placement: 'inside',
  },
  [Step.GASLESS_SWAP]: { component: LoadingSpinner, placement: 'inside' },
}

export const getStepDetails = (step: StepType): StepRenderDetailsType => {
  const details = componentByStep[step]
  return {
    //i18n namespace
    name: step,
    main: details.component,
    placement: details.placement,
    ornament: details.ornament,
    showNextButton: details.showNextButton ?? false,
  }
}
