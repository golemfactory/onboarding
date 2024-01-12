import { OnboardingContainer } from 'components/organisms/onboarding/container/OnboardingContainer'
import {
  AwaitForMetamaskSDK,
  OnboardingProvider,
  SetupProvider,
} from 'components/providers'

import { FC } from 'react'
import { ManualTestGateway } from 'components/organisms/manualTestGateway/ManualTestGateway'

import {
  createHashRouter,
  HashRouter,
  Route,
  RouterProvider,
  Routes,
  useLocation,
} from 'react-router-dom'

import { ErrorBoundary } from 'components/providers/ErrorBoundary'

import { BlockchainProvider } from 'components/providers'
import { DevPlaygroundDashboard } from 'components/organisms/DevPlaygroundDashboard'
import { ThemeProvider } from 'components/providers/ThemeProvider'
import { LandingPage } from 'components/pages'
import { AnimatePresence } from 'framer-motion'
import { UnsupportedPage } from 'components/pages/unsupported'
import { AnimatedPage } from 'components/pages/AnimatedPage'

// const router = createHashRouter([
//   {
//     path: '/',
//     element: (
//       <ThemeProvider>
//         <LandingPage />
//       </ThemeProvider>
//     ),
//   },
//   {
//     path: '/onboarding',
//     errorElement: <ErrorBoundary />,
//     element: (
//       <SetupProvider>
//         <BlockchainProvider>
//           <AwaitForMetamaskSDK>
//             <OnboardingProvider>
//               <OnboardingContainer />
//             </OnboardingProvider>
//           </AwaitForMetamaskSDK>
//         </BlockchainProvider>
//       </SetupProvider>
//     ),
//   },
//   {
//     path: '/testing_gateway',
//     element: (
//       <BlockchainProvider>
//         <AwaitForMetamaskSDK>
//           <ManualTestGateway />
//         </AwaitForMetamaskSDK>
//       </BlockchainProvider>
//     ),
//   },
//   {
//     path: '/playground',
//     element: (
//       <BlockchainProvider>
//         <DevPlaygroundDashboard />
//       </BlockchainProvider>
//     ),
//   },
// ])

const Router: FC = () => {
  const location = useLocation()

  const locationArr = location.pathname?.split('/') ?? []
  return (
    <AnimatePresence>
      <Routes location={location} key={locationArr[1]}>
        <Route
          path="/"
          element={
            <AnimatedPage>
              <ThemeProvider>
                <LandingPage />
              </ThemeProvider>
            </AnimatedPage>
          }
        />
        <Route
          path="/unsupported"
          element={
            <AnimatedPage>
              <ThemeProvider>
                <UnsupportedPage />
              </ThemeProvider>
            </AnimatedPage>
          }
        />
      </Routes>
    </AnimatePresence>
  )
}

const App = () => {
  return <HashRouter>{<Router />}</HashRouter>
}
export default App
