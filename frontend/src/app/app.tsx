import { OnboardingContainer } from 'components/organisms/onboarding/OnboardingContainer'
import {
  OnboardingProvider,
  MetaMaskContextProvider,
  SetupProvider,
} from 'components/providers'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/onboarding',
    element: (
      <SetupProvider>
        <MetaMaskContextProvider>
          <OnboardingProvider>
            <OnboardingContainer />
          </OnboardingProvider>
        </MetaMaskContextProvider>
      </SetupProvider>
    ),
  },
])
import { FC } from 'react'

const App: FC = () => {
  return <RouterProvider router={router} />
}

export default App
