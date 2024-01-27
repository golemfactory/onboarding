import { Trans } from 'react-i18next'
import sectionStyle from './API.section.module.css'
import landingStyle from './LandingPage.module.css'
import globalStyle from 'styles/global.module.css'
import { Button } from 'components/atoms'
import { GlobeIcon } from 'components/atoms/icons/globe.icon'
import { AnimatedSection } from './AnimatedSection'

const style = {
  ...sectionStyle,
  ...landingStyle,
  ...globalStyle,
}

export const APISection = () => {
  return (
    <AnimatedSection>
      <div className={style.container}>
        <div className={style.lineContainer}>
          <div className={style.fadingLine}> </div>
        </div>
        <div className={style.contentContainer}>
          <div className={`${style.title} text-left mt-8`}>
            <Trans i18nKey="apiSectionTitle" ns="landing" />
          </div>
          <div className={`${style.subtitle} text-left mt-4 mb-8`}>
            <Trans i18nKey="apiSectionSubtitle" ns="landing" />
          </div>
          <div className="text-left mb-8 ">
            <Button
              buttonStyle="outline"
              useDefault={false}
              className="px-6 py-3 !bg-transparent"
            >
              <Trans i18nKey="readMore" ns="landing" />
            </Button>
          </div>
        </div>
        <div className="col-span-4 md:col-start-8 xl:col-start-9">
          <GlobeIcon />
        </div>
      </div>
    </AnimatedSection>
  )
}
