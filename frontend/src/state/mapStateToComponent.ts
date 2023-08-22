import { Steps } from './steps'
import {
  Welcome,
  ConnectWallet,
  NoProvider,
  ChooseNetwork,
  OnRamp,
} from 'components/organisms/onboarding'

export const mapStateToComponent = (state: any): React.FC<any> => {
  switch (state) {
    case Steps.WELCOME:
      return Welcome
    case Steps.CONNECT_WALLET:
      return ConnectWallet
    case Steps.SHOW_METAMASK_LINK:
      return NoProvider
    case Steps.CHOOSE_NETWORK:
      return ChooseNetwork
    case Steps.ON_RAMP:
      return OnRamp
    default:
      return Welcome
  }
}
