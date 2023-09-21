import { LoadingSpinner } from 'components/atoms/loadingSpinner'
import { Steps } from './steps'
import {
  Welcome,
  ConnectWallet,
  NoProvider,
  ChooseNetwork,
  OnRamp,
  WalletIntro,
  SwapTokens,
  NoProviderWrapped,
  NotSupported,
  Finish,
  AddGLM,
} from 'components/organisms/onboarding'

export const mapStateToComponent = (state: any): React.FC<any> => {
  switch (state) {
    case Steps.WELCOME:
      return Welcome
    case Steps.CONNECT_WALLET_SUCCESS:
      return ChooseNetwork
    case Steps.CONNECT_WALLET:
      return ConnectWallet
    case Steps.SHOW_METAMASK_LINK:
      return NoProviderWrapped
    case Steps.CHOOSE_NETWORK:
      return ChooseNetwork
    case Steps.ON_RAMP:
      return OnRamp
    case Steps.WALLET_INTRO:
      return WalletIntro
    case Steps.DETECT_METAMASK:
      return LoadingSpinner
    case Steps.CHECK_ACCOUNT_BALANCES:
      return LoadingSpinner
    case Steps.SWAP:
      return SwapTokens
    case Steps.GASLESS_SWAP:
      return NotSupported
    case Steps.FINISH:
      return Finish
    case Steps.ADD_GLM:
      return AddGLM
    default:
      return LoadingSpinner
  }
}
