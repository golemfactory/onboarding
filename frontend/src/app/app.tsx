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
import { DevPlaygroundDashboard } from 'components/organisms/DevPlaygroundDashboard'
import { ThemeProvider } from 'components/providers/ThemeProvider'
import { LandingPage } from 'components/pages/LandingPage'

const router = createHashRouter([
  {
    path: '/',
    element: (
      <ThemeProvider>
        <LandingPage />
      </ThemeProvider>
    ),
  },
  {
    path: '/onboarding',
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
  {
    path: '/playground',
    element: (
      <BlockchainProvider>
        <DevPlaygroundDashboard />
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
