import { OnboardingContainer } from 'components/organisms/onboarding/OnboardingContainer'
import {
  AwaitForMetamaskSDK,
  OnboardingProvider,
  SetupProvider,
} from 'components/providers'

import { FC } from 'react'
import { ManualTestGateway } from 'components/organisms/manualTestGateway/ManualTestGateway'
import { TestingSetupProvider } from 'components/providers/TestingSetup.provider'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { MetaMaskProvider } from '@metamask/sdk-react'

const metaMaskSDKOptions = {
  logging: {
    developerMode: true,
  },
  checkInstallationImmediately: false,
  dappMetadata: {
    name: 'Golem onboarding',
    url: window.location.host,
  },
}

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <SetupProvider>
        <MetaMaskProvider sdkOptions={metaMaskSDKOptions}>
          <AwaitForMetamaskSDK>
            <OnboardingProvider>
              <OnboardingContainer />
            </OnboardingProvider>
          </AwaitForMetamaskSDK>
        </MetaMaskProvider>
      </SetupProvider>
    ),
  },
  {
    path: '/testing_gateway',
    element: (
      <MetaMaskProvider sdkOptions={metaMaskSDKOptions}>
        <AwaitForMetamaskSDK>
          <TestingSetupProvider>
            <ManualTestGateway />
          </TestingSetupProvider>
        </AwaitForMetamaskSDK>
      </MetaMaskProvider>
    ),
  },
])

const App: FC = () => {
  return <RouterProvider router={router} />
}

export default App
