import videoSectionStyle from './Video.section.module.css'
import landingPageStyle from './LandingPage.module.css'
import globalStyle from 'styles/global.module.css'
import { Trans } from 'components/atoms'
import { Bullet } from 'components/atoms/bullet/Bullet'
import { AnimatedSection } from './AnimatedSection'

const style = {
  ...videoSectionStyle,
  ...landingPageStyle,
  ...globalStyle,
}

export const VideoSection = () => {
  return (
    <AnimatedSection>
      <div className={style.bulletContainer}>
        <Bullet />
      </div>
      <div className={style.videoTextContainer}>
        <div className={style.title}>
          <Trans i18nKey="videoTitle" ns="landing" />
        </div>
        <div className={style.smallDescription}>
          <Trans i18nKey="videoDescription" ns="landing" />
        </div>
      </div>
      <video className={style.video} controls poster="poster.jpg">
        <source src="https://downloads.dev.golem.network/golem-cut.mov" />
        Your browser does not support the video tag.
      </video>
    </AnimatedSection>
  )
}
