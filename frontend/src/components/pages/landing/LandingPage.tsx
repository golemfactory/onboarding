import { useTheme } from 'components/providers/ThemeProvider'
import { GolemCenterLogo } from './GolemCenteredLogo'
import style from './LandingPage.module.css'
import { Fragment } from 'react'

import { Card } from 'components/atoms/card'
import { Trans } from 'components/atoms'
import { BulletedContainer } from 'components/atoms/bulletedContainer/BulletedContainer'

const LandingPageContent = () => {
  return (
    <>
      <div className={style.centeredContent}>
        <div className={style.title}>
          <Trans i18nKey="title" ns="landing" />
        </div>
        <div className={style.subtitle}>
          <Trans i18nKey="subtitle" ns="landing" />
        </div>
        <GolemCenterLogo />
      </div>

      <Card className={style.contentCard}>dupa</Card>
      <Card className={style.contentCard}>dupa</Card>
      <Card className={style.contentCard}>dupa</Card>
      <BulletedContainer>
        <div className={style.title}>
          <Trans i18nKey="title" ns="landing" />
        </div>
      </BulletedContainer>
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
