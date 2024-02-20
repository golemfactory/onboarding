import { FC, useEffect } from 'react'

import { HashRouter, Route, Routes, useLocation } from 'react-router-dom'

import { ThemeProvider } from 'components/providers/ThemeProvider'
import { LandingPage } from 'components/pages'
import { AnimatePresence } from 'framer-motion'
import { UnsupportedPage } from 'components/pages/unsupported'
import { AnimatedPage } from 'components/pages/AnimatedPage'
import { v4 as uuidv4 } from 'uuid'
import {
  BlockchainProvider,
  OnboardingProvider,
  SetupProvider,
} from 'components/providers'

import Hotjar from '@hotjar/browser'

import { OnboardingPage } from 'components/pages'
import { TooltipProvider } from 'components/providers/Tooltip.provider'
import { useRouteControl } from 'hooks/useRouteControl'
import { Playground } from 'components/pages/playground/Playground'

import { ErrorBoundary } from 'react-error-boundary'
import { ErrorBoundary as Fallback } from 'components/providers/ErrorBoundary'
import useHotjar from 'react-use-hotjar'
import { set } from 'lodash'

const Onboarding = () => {
  const location = useLocation()
  const { initHotjar, identifyHotjar } = useHotjar()

  useEffect(() => {
    console.log('init hotjar', import.meta.env.VITE_HOTJAR_SITE_ID)
    Hotjar.init(import.meta.env.VITE_HOTJAR_SITE_ID, 6, { debug: true })
    Hotjar.identify(uuidv4(), { test: 'test' })
  }, [Hotjar])

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
        <Route
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
        <Route path="/playground" element={<Playground />} />
      </Routes>
    </AnimatePresence>
  )
}

const Router: FC = () => {
  return (
    <ErrorBoundary FallbackComponent={Fallback}>
      <>
        <TooltipProvider>
          <ThemeProvider>
            <BlockchainProvider>
              <OnboardingProvider>
                <Onboarding />
              </OnboardingProvider>
            </BlockchainProvider>
          </ThemeProvider>
        </TooltipProvider>
      </>
    </ErrorBoundary>
  )
}

const App = () => {
  return <HashRouter>{<Router />}</HashRouter>
}
export default App
