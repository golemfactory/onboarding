import { ComponentType } from 'react'
import style from './BudgetCard.module.css'
import { Trans } from 'components/atoms'
import { Loader } from 'components/molecules/loader/loader'
import { settings } from 'settings'
import { useOnboardingExchangeRates } from 'hooks/useRate'
import { GolemCoinIcon, MaticCoinIcon } from 'components/atoms/icons'

function roundToHalf(num: number) {
  return Math.round(num * 2) / 2
}

import { BudgetOption } from 'types/dataContext'
import { Network } from 'types/ethereum'
import {
  InfoTooltip,
  InfoTooltipTrigger,
} from 'components/organisms/tooltip/InfoTooltip'
import { motion } from 'framer-motion'
export const BudgetCard = ({
  id,
  Icon,
  selectBudget,
  selected,
}: {
  id: (typeof BudgetOption)[keyof typeof BudgetOption]
  Icon: ComponentType<{ className: string }>
  selectBudget: () => void
  selected?: boolean
}) => {
  //i18n
  const title = `${id}.title`
  const description = `${id}.description`
  //settings
  const totalBudget = Number(settings.budgetOptions[id])
  const usageCostInUSD = totalBudget - settings.rampFee

  const glmCoinValue = 30
  const maticCoinValue = 4
  const { data: rates } = useOnboardingExchangeRates(Network.POLYGON)

  const usageTime = Math.round(
    (usageCostInUSD * (1 - settings.feesPercentage) * rates.GLM * 1) /
      settings.hourCost
  )

  const maticCost = roundToHalf(
    usageCostInUSD * settings.feesPercentage * (rates?.['Native'] || 0)
  )
  const glmCost = Math.round(
    usageCostInUSD * (1 - settings.feesPercentage) * (rates?.['GLM'] || 0)
  )

  const golemCoinsCount = Math.ceil(glmCost / glmCoinValue)
  const maticCoinsCount = Math.ceil(maticCost / maticCoinValue)

  return (
    <motion.div
      className={`${style.card} ${selected ? style.selected : ''}`}
      onClick={() => {
        selectBudget()
      }}
      key={title}
    >
      <div className={style.top}>
        <div className={style.head}>
          <div className={style.headLeft}>
            <div className={style.caps10px}>
              <Trans i18nKey="around" ns="welcome.step" />
            </div>
            <div className={style.time}>
              <Loader
                className="w-8 h-8 p-4 m-3"
                value={
                  <motion.span initial="hidden" animate="visible" exit="hidden">
                    {usageTime}
                    <span>h</span>
                  </motion.span>
                }
              />
            </div>
          </div>
          <div className={style.headRight}>
            <Icon className={`${style.icon}`} />
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
            <Trans i18nKey="for" ns="welcome.step" /> {`${totalBudget}$`}
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
              <Loader
                className="w-4 h-4"
                value={
                  <span className="text-h6 text-primary font-kanit">
                    ≈ {glmCost} GLM
                  </span>
                }
              ></Loader>

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
              <span className={`${style.caps10px} flex gap-2 z-40`}>
                <Trans i18nKey="coversFees" ns="welcome.step" />{' '}
                <InfoTooltipTrigger
                  id="matic"
                  appearance="secondary"
                  name={id}
                />
                <InfoTooltip id="matic" appearance="secondary" name={id} />
              </span>
            </div>
          </div>
        </div>

        <div className={`${style.description}`}>
          <Trans i18nKey={`cards.${description}`} ns="welcome.step" />
        </div>
      </div>
    </motion.div>
  )
}
