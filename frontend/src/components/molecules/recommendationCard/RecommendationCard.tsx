import { Trans } from 'react-i18next'
import style from './RecommendationCard.module.css'
import { settings } from 'settings'
import { useOnboarding } from 'hooks/useOnboarding'
import { useOnboardingExchangeRates } from 'hooks/useRate'

export const RecommendationCardPresentational = ({
  fiat,
  token,
}: {
  fiat: number
  token: number
}) => {
  return (
    <div
      className={`${style.card} text-white py-4 pl-6 mx-8 my-6 flex flex-col gap-1`}
    >
      <div className="text-body-normal ">
        <Trans i18nKey="exchangeRecommended" ns="layout" />
      </div>
      <div className="flex gap-10 items-center">
        <div className="text-h2">
          {fiat}
          <div className="text-h3 inline"> $</div>
        </div>
        <div className="text-body-medium">≈ {token} Matic </div>
      </div>
    </div>
  )
}

export const RecommendationCard = () => {
  const { data } = useOnboardingExchangeRates()
  const { state } = useOnboarding()

  const fiat = Math.round(
    settings.budgetOptions[state.context.budget] * settings.hourCost
  )
  const token = Math.round((fiat / (data?.['Matic'] || 0)) * 2) / 2
  return <RecommendationCardPresentational fiat={fiat} token={token} />
}
