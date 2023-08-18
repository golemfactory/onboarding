import { Steps } from './steps'
import { Welcome } from 'components/organisms/onboarding'
import { ConnectWallet } from 'components/organisms/onboarding'
import { MouseEventHandler } from 'react'

export const mapStateToComponent = (state: any): React.FC<any> => {
  switch (state) {
    case 'welcome':
      return Welcome
    case 'connect-wallet':
      return ConnectWallet
    default:
      return Welcome
  }
}
