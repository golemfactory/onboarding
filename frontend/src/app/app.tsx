import { OnboardingContainer } from 'components/organisms/onboarding/OnboardingContainer'
import {
  AwaitForMetamaskSDK,
  OnboardingProvider,
  SetupProvider,
} from 'components/providers'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { MetaMaskProvider } from '@metamask/sdk-react'

const router = createBrowserRouter([
  {
    path: '/onboarding',
    element: (
      <SetupProvider>
        <MetaMaskProvider
          sdkOptions={{
            logging: {
              developerMode: true,
            },
            checkInstallationImmediately: false,
            dappMetadata: {
              name: 'Golem onboarding',
              url: window.location.host,
            },
          }}
        >
          <AwaitForMetamaskSDK>
            <OnboardingProvider>
              <OnboardingContainer />
            </OnboardingProvider>
          </AwaitForMetamaskSDK>
        </MetaMaskProvider>
      </SetupProvider>
    ),
  },
])
import { FC } from 'react'
import MetaMaskSDK from '@metamask/sdk'

const App: FC = () => {
  return <RouterProvider router={router} />
}

export default App
