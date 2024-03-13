import sectionStyle from './WhatYouNeed.section.module.css'
import landingPageStyle from './LandingPage.module.css'
import globalStyle from 'styles/global.module.css'
import { Button, Trans } from 'components/atoms'
import { Bullet } from 'components/atoms/bullet/Bullet'
import { AnimatedSection } from './AnimatedSection'
import { useIsDesktop } from 'hooks/useIsDesktop'

const style = {
  ...sectionStyle,
  ...landingPageStyle,
  ...globalStyle,
}

const NumberCircle = ({ number }: { number: number }) => {
  return (
    <div className={`${style.numberCircle} col-span-12 xs:col-span-1`}>
      {number}
    </div>
  )
}

const needs = ['setupCrypto', 'getTokens', 'topUp']

export const WhatYouNeedSection = ({
  startOnboarding,
}: {
  startOnboarding: () => void
}) => {
  const isDesktop = useIsDesktop()
  return (
    <AnimatedSection>
      <div className={style.separator} />
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
              <div key={need} className="grid grid-cols-12 gap-6">
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
          <div className="grid grid-cols-12">
            <div className="col-span-1"></div>
            <div className="col-span-11">
              {isDesktop ? (
                <Button
                  className="px-9 py-3"
                  buttonStyle="solid"
                  useDefault={true}
                  onClick={startOnboarding}
                >
                  <Trans i18nKey="getStarted" ns="landing" />
                </Button>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={style.ornamentContainer}>
        <img src="wallet2.png" alt="ornament" />
      </div>
    </AnimatedSection>
  )
}
