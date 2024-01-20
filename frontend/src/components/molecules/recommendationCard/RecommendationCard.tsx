import { MouseEventHandler, ReactNode } from 'react'
import style from './RecommendationCard.module.css'
import { Trans } from 'components/atoms'

import { settings } from 'settings'
import { useOnboardingExchangeRates } from 'hooks/useRate'
import { GolemCoinIcon, MaticCoinIcon } from 'components/atoms/icons'

function roundToHalf(num) {
  // Multiply by 2, round to nearest integer, then divide by 2
  return Math.round(num * 2) / 2
}

export const RecommendationCard = ({
  usageTime,
  description,
  Icon,
  title,
  onClick,
  selected,
}: {
  usageTime: number
  description: string
  Icon: ReactNode
  title: string
  onClick: MouseEventHandler
  selected?: boolean
}) => {
  const glmCoinValue = 30
  const maticCoinValue = 4
  const { data: rates } = useOnboardingExchangeRates()
  const usageCost = Math.round(usageTime * settings.hourCost)
  const maticCost = roundToHalf(
    usageCost * settings.feesPercentage * (rates?.['Matic'] || 0)
  )
  const glmCost = roundToHalf(
    usageCost * (1 - settings.feesPercentage) * (rates?.['GLM'] || 0)
  )

  const golemCoinsCount = Math.ceil(glmCost / glmCoinValue)
  const maticCoinsCount = Math.ceil(maticCost / maticCoinValue)

  return (
    <div className={style.card} onClick={onClick}>
      <div className={style.top}>
        <div className={style.head}>
          <div className={style.headLeft}>
            <div className={style.caps10px}>arround</div>
            <div className={style.time}>
              {usageTime}
              <span>h</span>
            </div>
          </div>
          <div className={style.headRight}>
            {Icon}
            <div className={style.title}>
              <Trans i18nKey={`cards.${title}`} ns="welcome.step" />
            </div>
          </div>
        </div>
        <div className={style.machineDescription}>
          <Trans i18nKey="machineDescription" ns="welcome.step" />
        </div>
      </div>

      <div className={style.bottom}>
        <div className={style.cost}>
          <div className="text-h3 text-primary font-kanit">
            <Trans i18nKey="for" ns="welcome.step" /> {`${usageCost}$`}
          </div>

          <div className="flex gap-2 ">
            {[...Array(golemCoinsCount)].map((_, idx) => {
              return (
                <span key={`golemCoin_${idx}`}>
                  <GolemCoinIcon
                    className={`w-6 h-6 text-primary opacity-100 ${
                      idx !== golemCoinsCount - 1 ? '-mr-7' : ''
                    }`}
                  />
                </span>
              )
            })}
            <div className="flex flex-col">
              <span className="text-h6 text-primary font-kanit">
                ≈ {glmCost} GLM
              </span>
              <span className={style.caps10px}>
                <Trans i18nKey="coversComputing" ns="welcome.step" />
              </span>
            </div>
          </div>

          <div className="flex gap-2 ">
            {[...Array(maticCoinsCount)].map((_, idx) => {
              return (
                <span key={`maticCoin_${idx}`}>
                  <MaticCoinIcon
                    className={`w-6 h-6 text-primary opacity-100 ${
                      idx !== maticCoinsCount - 1 ? '-mr-7' : ''
                    }`}
                  />
                </span>
              )
            })}
            <div className="flex flex-col">
              <span className="text-h6 text-primary font-kanit">
                ≈ {maticCost} MATIC
              </span>
              <span className={style.caps10px}>
                <Trans i18nKey="coverFees" ns="welcome.step" />
              </span>
            </div>
          </div>
        </div>

        <div className={`${style.description}`}>
          <Trans i18nKey={`cards.${description}`} ns="welcome.step" />
        </div>
      </div>
    </div>
  )
}
