import { Bullet, Trans } from 'components/atoms'
import sectionStyle from './UseCase.section.module.css'
import landingStyle from './LandingPage.module.css'
import globalStyle from 'styles/global.module.css'

import { Card, CardDataType } from 'components/molecules/useCaseCard/Card'
import { AnimatedSection } from './AnimatedSection'
import {
  ArrowsExpandIcon,
  ChipIcon,
  TerminalIcon,
} from 'components/atoms/icons'

const style = {
  ...sectionStyle,
  ...landingStyle,
  ...globalStyle,
}

const useCases: CardDataType[] = [
  {
    title: 'deployCaseTitle',
    description: 'deployCaseDescription',
    icon: TerminalIcon,
    exploreLink: 'https://docs.golem.network/docs/creators/dapps',
    namespace: 'landing',
    appearance: 'landing',
  },
  {
    title: 'distributionCaseTitle',
    description: 'distributionCaseDescription',
    icon: ArrowsExpandIcon,
    exploreLink: 'https://docs.golem.network/docs/creators/ray',
    namespace: 'landing',
    appearance: 'landing',
  },
  {
    title: 'AICaseTitle',
    description: 'AICaseDescription',
    icon: ChipIcon,
    badge: 'InternalAlfa',
    namespace: 'landing',
    appearance: 'landing',
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
        {useCases.map((data) => (
          <Card key={`card_${data.title}`} {...data}></Card>
        ))}
      </div>
    </AnimatedSection>
  )
}
