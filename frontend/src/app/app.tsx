import { FC } from 'react'

import { HashRouter, Route, Routes, useLocation } from 'react-router-dom'

import { ThemeProvider } from 'components/providers/ThemeProvider'
import { LandingPage } from 'components/pages'
import { AnimatePresence } from 'framer-motion'
import { UnsupportedPage } from 'components/pages/unsupported'
import { AnimatedPage } from 'components/pages/AnimatedPage'

import {
  BlockchainProvider,
  OnboardingProvider,
  SetupProvider,
} from 'components/providers'
import { OnboardingPage } from 'components/pages'
import { TooltipProvider } from 'components/providers/Tooltip.provider'
import { useRouteControl } from 'hooks/useRouteControl'
import { Playground } from 'components/pages/playground/Playground'

import { ErrorBoundary } from 'react-error-boundary'
import { ErrorBoundary as Fallback } from 'components/providers/ErrorBoundary'

const Onboarding = () => {
  const location = useLocation()
  const locationArr = location.pathname?.split('/') ?? []
  useRouteControl()
  return (
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
        {/* <Route
          path="/unsupported"
          element={
            <AnimatedPage>
              <UnsupportedPage />
            </AnimatedPage>
          }
        />
        <Route
          path={`onboarding/*`}
          element={
            <AnimatedPage>
              <OnboardingPage />
            </AnimatedPage>
          }
        ></Route>
        <Route
          path={'/finish'}
          element={
            <AnimatedPage>
              <OnboardingPage />
            </AnimatedPage>
          }
        ></Route>
        <Route path="/playground" element={<Playground />} /> */}
      </Routes>
    </AnimatePresence>
  )
}

const Router: FC = () => {
  return (
    <ErrorBoundary FallbackComponent={Fallback}>
      <SetupProvider>
        <TooltipProvider>
          <ThemeProvider>
            <BlockchainProvider>
              <OnboardingProvider>
                <Onboarding />
              </OnboardingProvider>
            </BlockchainProvider>
          </ThemeProvider>
        </TooltipProvider>
      </SetupProvider>
    </ErrorBoundary>
  )
}

const App = () => {
  return <HashRouter>{<Router />}</HashRouter>
}
export default App
