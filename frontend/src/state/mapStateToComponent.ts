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
} from 'components/organisms/onboarding'
import { FC } from 'react'

export const mapStateToComponent = (state: StepType): FC<any> => {
  switch (state) {
    case Step.WELCOME:
      return Welcome
    case Step.CONNECT_WALLET_SUCCESS:
      return ChooseNetwork
    case Step.CONNECT_WALLET:
      return ConnectWallet
    case Step.SHOW_METAMASK_LINK:
      return NoProviderWrapped
    case Step.CHOOSE_NETWORK:
      return ChooseNetwork
    case Step.ON_RAMP:
      return OnRamp
    case Step.WALLET_INTRO:
      return WalletIntro
    case Step.DETECT_METAMASK:
      return LoadingSpinner
    case Step.CHECK_ACCOUNT_BALANCES:
      return LoadingSpinner
    case Step.SWAP:
      return SwapTokens
    case Step.GASLESS_SWAP:
      return NotSupported
    case Step.FINISH:
      return Finish
    case Step.ADD_GLM:
      return AddGLM
    default:
      return LoadingSpinner
  }
}
