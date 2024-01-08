import { Icon, RightArrowIcon } from 'components/atoms/icons'
import style from './Card.module.css'
import { UseCaseType } from './types'
import { Trans } from 'components/atoms'
export const UseCaseCard = ({
  icon,
  title,
  description,
  badge,
  exploreLink,
}: UseCaseType) => {
  return (
    <div className={style.card}>
      <div className={style.top}>
        <Icon icon={icon} />

        {badge ? (
          <div className={style.badge}>
            <Trans i18nKey={badge} ns="landing" />
          </div>
        ) : (
          ''
        )}
      </div>
      <div className={style.title}>
        <Trans i18nKey={title} ns="landing" />
      </div>
      <div className={style.description}>
        <Trans i18nKey={description} ns="landing" />
      </div>
      {exploreLink ? (
        <a href={exploreLink} className={`${style.exploreButton} tertiary`}>
          {' '}
          <Trans i18nKey="explore" ns="landing" />
          <RightArrowIcon />
        </a>
      ) : (
        ''
      )}
    </div>
  )
}
