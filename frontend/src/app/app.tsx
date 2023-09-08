import { OnboardingContainer } from 'components/organisms/onboarding/OnboardingContainer'
import {
  AwaitForMetamaskSDK,
  OnboardingProvider,
  SetupProvider,
} from 'components/providers'

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
    path: '/onboarding',
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
          <ManualTestGateway />
        </AwaitForMetamaskSDK>
      </MetaMaskProvider>
    ),
  },
])
import { FC } from 'react'
import MetaMaskSDK from '@metamask/sdk'
import { m } from 'framer-motion'
import { ManualTestGateway } from 'components/organisms/manualTestGateway/ManualTestGateway'

const App: FC = () => {
  return <RouterProvider router={router} />
}

export default App
