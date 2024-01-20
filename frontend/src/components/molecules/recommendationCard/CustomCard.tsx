import style from './RecommendationCard.module.css'
import { Trans } from 'components/atoms'
import { AdjustmentsVerticalIcon } from '@heroicons/react/24/outline'

export const CustomRecommendationCard = () => {
  return (
    <div className={style.card}>
      <div className={style.top}>
        <div className={style.head}>
          <div className={style.headLeft}></div>
          <div className={style.headRight}>
            <AdjustmentsVerticalIcon className="w-6 h-6 text-primary" />
            <div className={style.title}>
              <Trans i18nKey="cards.custom.title" ns="welcome.step" />
            </div>
          </div>
        </div>
      </div>
      <div className={`${style.bottom}`}>
        <div className={style.cost}>
          <div className="text-h3 text-neutral-grey-300 font-kanit">
            <Trans i18nKey="cards.custom.title" ns="welcome.step" />
          </div>

          <div className={`${style.caps10px}`} style={{ height: '84px' }}>
            <Trans i18nKey="cards.custom.cost" ns="welcome.step" />
          </div>
        </div>

        <div className={`${style.description}`}>
          <Trans i18nKey="cards.custom.description" ns="welcome.step" />
        </div>
      </div>
    </div>
  )
}
