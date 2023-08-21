import { OnboardingContainer } from 'components/organisms/onboarding/OnboardingContainer'
import {
  OnboardingProvider,
  MetaMaskContextProvider,
} from 'components/providers'

const App = (): JSX.Element => {
  //For now we render only onboarding container
  //however in the future we will add more routes
  //that potentially will be depend on the onboarding state
  //that why provider is here
  //TODO : add router

  return (
    <MetaMaskContextProvider>
      <OnboardingProvider>
        <OnboardingContainer />
      </OnboardingProvider>
    </MetaMaskContextProvider>
  )
}

export default App
