import { OnboardingContainer } from 'components/organisms/onboarding/OnboardingContainer'
import { AwaitForMetamaskSDK, OnboardingProvider, SetupProvider } from 'components/providers'

import { FC } from 'react'
import { ManualTestGateway } from 'components/organisms/manualTestGateway/ManualTestGateway'

import { createHashRouter, RouterProvider } from 'react-router-dom'

import { MetaMaskProvider } from 'components/providers/MetamaskProvider'

import { ErrorBoundary } from 'components/providers/ErrorBoundary'

const router = createHashRouter([
  {
    path: '/',
    errorElement: <ErrorBoundary />,
    element: (
      <SetupProvider>
        <MetaMaskProvider>
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
      <MetaMaskProvider>
        <AwaitForMetamaskSDK>
          <ManualTestGateway />
        </AwaitForMetamaskSDK>
      </MetaMaskProvider>
    ),
  },
])

const App: FC = () => {
  return <RouterProvider router={router} />
}

export default App
