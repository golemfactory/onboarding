import { useTheme } from 'components/providers/ThemeProvider'
import { GolemCenterLogo } from './GolemCenteredLogo'
import { config } from './config'
import style from './LandingPage.module.css'
import { Fragment } from 'react'

import { Card } from 'components/atoms/card'

const LandingPageContent = () => {
  return (
    <>
      <div className={style.centeredContent}>
        <div className={style.title}>
          {config.title.split('\n').map((line, index) => (
            <Fragment key={index}>
              {line}
              <br />
            </Fragment>
          ))}
        </div>
        <div className={style.subtitle}>
          {config.subtitle.split('\n').map((line, index) => (
            <Fragment key={index}>
              {line}
              <br />
            </Fragment>
          ))}
        </div>
        <GolemCenterLogo />
      </div>

      <Card className={style.contentCard}>dupa</Card>
      <Card className={style.contentCard}>dupa</Card>
      <Card className={style.contentCard}>dupa</Card>
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
