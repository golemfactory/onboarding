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

const Router: FC = () => {
  const location = useLocation()

  const locationArr = location.pathname?.split('/') ?? []
  return (
    <SetupProvider>
      <TooltipProvider>
        <ThemeProvider>
          <BlockchainProvider>
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
                <Route
                  path="/onboarding"
                  element={
                    <AnimatedPage>
                      <OnboardingProvider>
                        <OnboardingPage />
                      </OnboardingProvider>
                    </AnimatedPage>
                  }
                ></Route>
              </Routes>
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
