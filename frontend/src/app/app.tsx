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

import { ThemeProvider } from 'components/providers/ThemeProvider'
import { LandingPage } from 'components/pages'
import { AnimatePresence } from 'framer-motion'
import { UnsupportedPage } from 'components/pages/unsupported'
import { AnimatedPage } from 'components/pages/AnimatedPage'

const Router: FC = () => {
  const location = useLocation()

  const locationArr = location.pathname?.split('/') ?? []
  return (
    <ThemeProvider>
      <AnimatePresence>
        <Routes location={location} key={locationArr[1]}>
          <Route
            path="/"
            element={
              <AnimatedPage>
                <LandingPage />
              </AnimatedPage>
            }
          />
          <Route
            path="/unsupported"
            element={
              <AnimatedPage>
                <UnsupportedPage />
              </AnimatedPage>
            }
          />
        </Routes>
      </AnimatePresence>
    </ThemeProvider>
  )
}

const App = () => {
  return <HashRouter>{<Router />}</HashRouter>
}
export default App
