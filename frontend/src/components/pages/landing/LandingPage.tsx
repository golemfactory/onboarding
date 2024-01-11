import { useTheme } from 'components/providers/ThemeProvider'
import { GolemCenterLogo } from './GolemCenteredLogo'
import style from './LandingPage.module.css'
import { Fragment, useEffect, useState } from 'react'
import { useDebounce } from 'usehooks-ts'

// import { Card } from 'components/atoms/card'
import { Trans } from 'components/atoms'
// import { BulletedContainer } from 'components/atoms/bulletedContainer/BulletedContainer'
import { VideoSection } from './Video.section'
import { UseCaseSection } from './UseCase.section'
import { APISection } from './API.section'
import { RunSection } from './Run.section'
import { use } from 'i18next'

const SectionSeparator = () => {
  return <div className={style.sectionSeparator} />
}

const LandingPageContent = () => {
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
          <div className={`${style.subtitle} text-center mt-4 mb-8`}>
            <Trans i18nKey="subtitle" ns="landing" />
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            top: Math.max(-200, 340 - debouncedScroll),
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
      {/* <Card className={style.contentCard}>test</Card>
      <Card className={style.contentCard}>test</Card>
      <Card className={style.contentCard}>test</Card>
      <BulletedContainer>
        <div className={style.title}>
          <Trans i18nKey="title" ns="landing" />
        </div>
      </BulletedContainer> */}
    </>
  )
}

export const LandingPage = () => {
  const theme = useTheme()
  const LayoutTemplate = theme.getLayoutTemplate()
  return (
    <LayoutTemplate
      header={<button> get GLM</button>}
      main={<LandingPageContent />}
    />
  )
}
