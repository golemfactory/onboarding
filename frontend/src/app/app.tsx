import { OnboardingContainer } from 'components/organisms/onboarding/container/OnboardingContainer'
import {
  AwaitForMetamaskSDK,
  OnboardingProvider,
  SetupProvider,
} from 'components/providers'

import { FC } from 'react'
import { ManualTestGateway } from 'components/organisms/manualTestGateway/ManualTestGateway'

import { createHashRouter, RouterProvider } from 'react-router-dom'

import { ErrorBoundary } from 'components/providers/ErrorBoundary'

import { BlockchainProvider } from 'components/providers'

const router = createHashRouter([
  {
    path: '/',
    errorElement: <ErrorBoundary />,
    element: (
      <SetupProvider>
        <BlockchainProvider>
          <AwaitForMetamaskSDK>
            <OnboardingProvider>
              <OnboardingContainer />
            </OnboardingProvider>
          </AwaitForMetamaskSDK>
        </BlockchainProvider>
      </SetupProvider>
    ),
  },
  {
    path: '/testing_gateway',
    element: (
      <BlockchainProvider>
        <AwaitForMetamaskSDK>
          <ManualTestGateway />
        </AwaitForMetamaskSDK>
      </BlockchainProvider>
    ),
  },
])

const App: FC = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
