import { LoadingSpinner } from 'components/atoms/loadingSpinner'
import { Step, StepType } from './steps'
import {
  Welcome,
  ConnectWallet,
  ChooseNetwork,
  OnRamp,
  SwapTokens,
  NotSupported,
  Finish,
  AddGLM,
  ChooseWallet,
  Transfer,
} from 'components/organisms/onboarding'
import React from 'react'
const componentByStep: Record<StepType, React.ElementType> = {
  [Step.WELCOME]: Welcome,
  [Step.CONNECT_WALLET_SUCCESS]: ChooseNetwork,
  [Step.CONNECT_WALLET]: ConnectWallet,
  [Step.CHOOSE_NETWORK]: ChooseNetwork,
  [Step.ON_RAMP]: OnRamp,
  [Step.DETECT_METAMASK]: LoadingSpinner,
  [Step.CHECK_ACCOUNT_BALANCES]: LoadingSpinner,
  [Step.SWAP]: SwapTokens,
  [Step.GASLESS_SWAP]: NotSupported,
  [Step.FINISH]: Finish,
  [Step.ADD_GLM]: AddGLM,
  [Step.CHOOSE_WALLET]: ChooseWallet,
  [Step.NOT_METAMASK]: NotSupported,
  [Step.TRANSFER]: Transfer,
}

export const mapStateToComponent = (state: StepType) => {
  return componentByStep[state]
}
