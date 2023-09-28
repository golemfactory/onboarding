import { LoadingSpinner } from 'components/atoms/loadingSpinner'
import { Step, StepType } from './steps'
import {
  Welcome,
  ConnectWallet,
  ChooseNetwork,
  OnRamp,
  WalletIntro,
  SwapTokens,
  NoProviderWrapped,
  NotSupported,
  Finish,
  AddGLM,
  ChooseWallet,
} from 'components/organisms/onboarding'

const componentByStep: Record<StepType, any> = {
  [Step.WELCOME]: Welcome,
  [Step.CONNECT_WALLET_SUCCESS]: ChooseNetwork,
  [Step.CONNECT_WALLET]: ConnectWallet,
  [Step.SHOW_METAMASK_LINK]: NoProviderWrapped,
  [Step.CHOOSE_NETWORK]: ChooseNetwork,
  [Step.ON_RAMP]: OnRamp,
  [Step.WALLET_INTRO]: WalletIntro,
  [Step.DETECT_METAMASK]: LoadingSpinner,
  [Step.CHECK_ACCOUNT_BALANCES]: LoadingSpinner,
  [Step.SWAP]: SwapTokens,
  [Step.GASLESS_SWAP]: NotSupported,
  [Step.FINISH]: Finish,
  [Step.ADD_GLM]: AddGLM,
  [Step.CHOOSE_WALLET]: ChooseWallet,
  [Step.NOT_METAMASK]: NotSupported,
  [Step.TRANSFER]: NotSupported,
}

export const mapStateToComponent = (state: StepType) => {
  return componentByStep[state]
}
