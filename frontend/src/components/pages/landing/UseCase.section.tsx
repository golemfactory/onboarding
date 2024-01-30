import { Bullet, Trans } from 'components/atoms'
import sectionStyle from './UseCase.section.module.css'
import landingStyle from './LandingPage.module.css'
import globalStyle from 'styles/global.module.css'

import { Card } from './Card'
import { CardData } from './types'
import { AnimatedSection } from './AnimatedSection'

const style = {
  ...sectionStyle,
  ...landingStyle,
  ...globalStyle,
}

const useCases: CardData[] = [
  {
    title: 'deployCaseTitle',
    description: 'deployCaseDescription',
    icon: 'terminal',
    exploreLink: 'https://docs.golem.network/docs/creators/dapps',
  },
  {
    title: 'distributionCaseTitle',
    description: 'distributionCaseDescription',
    icon: 'arrows',
    exploreLink: 'https://docs.golem.network/docs/creators/ray',
  },
  {
    title: 'AICaseTitle',
    description: 'AICaseDescription',
    icon: 'chip',
    badge: 'InternalAlfa',
  },
]
export const UseCaseSection = () => {
  return (
    <AnimatedSection>
      <div className={style.container}>
        <div className={style.bulletContainer}>
          <Bullet />
        </div>
        <div className={style.titleContainer}>
          <div className={`${style.title} ml-4 sm:ml-0 text-left`}>
            <Trans i18nKey="useCasesTitle" ns="landing" />
          </div>
        </div>
        <div className={style.separator} />
        {useCases
          .map((x) => {
            return { ...x, className: style.card }
          })
          .map(Card)}
      </div>
    </AnimatedSection>
  )
}
