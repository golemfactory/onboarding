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
import { stepPaths } from 'state/steps'
import { useRouteControl } from 'hooks/useRouteControl'

const Onboarding = () => {
  const location = useLocation()
  const locationArr = location.pathname?.split('/') ?? []
  useRouteControl()
  return (
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
      {Object.values(stepPaths).map((step) => {
        return (
          <Route
            key={step}
            path={`/${step}`}
            element={
              <AnimatedPage>
                <OnboardingPage />
              </AnimatedPage>
            }
          ></Route>
        )
      })}
    </Routes>
  )
}

const Router: FC = () => {
  return (
    <SetupProvider>
      <TooltipProvider>
        <ThemeProvider>
          <BlockchainProvider>
            <AnimatePresence>
              <OnboardingProvider>
                <Onboarding />
              </OnboardingProvider>
            </AnimatePresence>
          </BlockchainProvider>
        </ThemeProvider>
      </TooltipProvider>
    </SetupProvider>
  )
}

const App = () => {
  return <HashRouter>{<Router />}</HashRouter>
}
export default App
