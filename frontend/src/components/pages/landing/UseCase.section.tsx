import { Bullet, Trans } from 'components/atoms'
import style from './UseCase.section.module.css'
import { UseCaseCard } from './Card'
import { UseCaseType } from './types'

const useCases: UseCaseType[] = [
  {
    title: 'deployCaseTitle',
    description: 'deployCaseDescription',
    icon: 'terminal',
    exploreLink: 'TODO',
  },
  {
    title: 'distributionCaseTitle',
    description: 'distributionCaseDescription',
    icon: 'arrows',
    exploreLink: 'TODO',
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
    <div className={style.container}>
      <div className={style.bulletContainer}>
        <Bullet />
      </div>
      <div className={style.titleContainer}>
        <Trans i18nKey="useCasesTitle" ns="landing" />
      </div>
      <div className={style.separator} />
      {useCases.map(UseCaseCard)}
    </div>
  )
}
