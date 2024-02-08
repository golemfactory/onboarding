import { useTheme } from 'components/providers/ThemeProvider'
import { GolemCenterLogo } from './GolemCenteredLogo'
import landingStyle from './LandingPage.module.css'
import globalStyle from 'styles/global.module.css'

import { useEffect, useState } from 'react'
import { useDebounce } from 'usehooks-ts'
import { Button, Trans } from 'components/atoms'
import { VideoSection } from './Video.section'
import { UseCaseSection } from './UseCase.section'
import { APISection } from './API.section'
import { RunSection } from './Run.section'
import { WhatYouNeedSection } from './WhatYouNeed.section'
import { useNavigate } from 'react-router-dom'
import { useIsDesktop } from 'hooks/useIsDesktop'
import { useOnboarding } from 'hooks/useOnboarding'
import { StepType, stepPaths } from 'state/steps'

const style = {
  ...landingStyle,
  ...globalStyle,
}

const SectionSeparator = () => {
  return <div className={style.sectionSeparator} />
}

const LandingPageContent = ({
  startOnboarding,
}: {
  startOnboarding: () => void
}) => {
  const [scroll, setScroll] = useState(0)

  const debouncedScroll = useDebounce(scroll, 1)

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <div className={style.centeredContent}>
        <div
          style={{
            position: 'absolute',
            top: Math.min(Math.max(0, 2 * debouncedScroll), 500) + 'px',
          }}
        >
          <div className={`${style.title} text-center`}>
            <Trans i18nKey="title" ns="landing" />
          </div>
          <div className={`${style.subtitle} text-center mt-4 mb-14`}>
            <Trans i18nKey="subtitle" ns="landing" />
          </div>
          <div className="text-center mb-8 ">
            <Button
              buttonStyle="solid"
              className="py-4 px-9 text-button-large"
              onClick={startOnboarding}
              useDefault={false}
            >
              <Trans i18nKey="getStarted" ns="landing" />
            </Button>
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            top: Math.max(-200, 540 - debouncedScroll),
          }}
        >
          <GolemCenterLogo />
        </div>
      </div>
      <VideoSection />
      <SectionSeparator />
      <UseCaseSection />
      <SectionSeparator />
      <APISection />
      <SectionSeparator />
      <RunSection />
      <SectionSeparator />
      <WhatYouNeedSection startOnboarding={startOnboarding} />
    </>
  )
}

export const LandingPage = () => {
  const theme = useTheme()
  const LayoutTemplate = theme.getLayoutTemplate()
  const navigate = useNavigate()
  const isDesktop = useIsDesktop()
  const { state } = useOnboarding()
  const startOnboarding = () => {
    const path = stepPaths[state.value as StepType]
    navigate(isDesktop ? `/onboarding${path || 'budget'}` : '/unsupported')
  }
  return (
    <LayoutTemplate
    // header={
    //   // <Button
    //   //   buttonStyle="solid"
    //   //   className="md:py-4 md:px-9 py-2 px-5 text-button-large mt-8"
    //   //   useDefault={true}
    //   //   onClick={startOnboarding}
    //   // >
    //   //   {/* <Trans i18nKey="getGLM" ns="landing" /> */}
    //   // </Button>
    // }
    >
      {/* <LandingPageContent startOnboarding={startOnboarding} /> */}
      <div className="col-span-10 col-start-2 text-h3 text-primary mt-20 text-center grid grid-cols-4">
        <div className="col-span-2 col-start-2">
          <img
            src="/placeholder.svg"
            className="mb-20 w-[50vw] text-center margin-auto"
          ></img>
        </div>
        <div className="col-span-4">
          This site is temporarily unavailable. We apologize for any
          inconvenience and appreciate your patience.
          <br></br>
          It will be back up soon! In the meantime, you can find the previous
          website with information about GLM token here:
          <br></br>
          <a
            href="https://migration-tracker.golem.network/"
            rel="noreferrer"
            target="_blank"
            className="text-primary underline inline"
          >
            https://migration-tracker.golem.network
          </a>
        </div>
      </div>
    </LayoutTemplate>
  )
}
