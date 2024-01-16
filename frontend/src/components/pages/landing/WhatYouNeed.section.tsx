import sectionStyle from './WhatYouNeed.section.module.css'
import landingPageStyle from './LandingPage.module.css'
import globalStyle from 'styles/global.module.css'
import { Button, Trans } from 'components/atoms'
import { Bullet } from 'components/atoms/bullet/Bullet'
import { AnimatedSection } from './AnimatedSection'
import { N } from 'ethers'

const style = {
  ...sectionStyle,
  ...landingPageStyle,
  ...globalStyle,
}

const NumberCircle = ({ number }) => {
  return <div className={`${style.numberCircle} col-span-1`}>{number}</div>
}

const needs = ['setupCrypto', 'getTokens', 'topUp']

export const WhatYouNeedSection = () => {
  return (
    <AnimatedSection>
      <div className={style.bulletContainer}>
        <Bullet />
      </div>
      <div className={style.textContainer}>
        <div className={style.title}>
          <Trans i18nKey="WhatYouNeedTitle" ns="landing" />
        </div>
        <div className="flex flex-col gap-12">
          {needs.map((need, index) => {
            return (
              <div key={need} className="grid grid-cols-12 gap-8">
                <NumberCircle number={index + 1} />
                <div className="flex flex-col col-span-11 gap-3">
                  <div className={style.subtitle}>
                    <Trans i18nKey={`${need}Title`} ns="landing" />
                  </div>
                  <div className={style.smallDescription}>
                    <Trans i18nKey={`${need}Description`} ns="landing" />
                  </div>
                </div>
              </div>
            )
          })}
          <div className="grid cols-12">
            <Button buttonStyle="solid" useDefault={false}>
              <Trans i18nKey="getStarted" ns="landing" />
            </Button>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
