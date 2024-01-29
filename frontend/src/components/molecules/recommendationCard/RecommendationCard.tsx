import { Trans } from 'components/atoms'
import style from './RecommendationCard.module.css'
import { settings } from 'settings'
import { useOnboarding } from 'hooks/useOnboarding'
import { useOnboardingExchangeRates } from 'hooks/useRate'
import { useBalance } from 'hooks/useBalance'
import { formatEther } from 'viem'

export const RecommendationCardPresentationalOnRamp = ({
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

export const RecommendationCardOnRamp = () => {
  const { data } = useOnboardingExchangeRates()
  const { state } = useOnboarding()

  const fiat = Math.round(
    settings.budgetOptions[state.context.budget] * settings.hourCost
  )
  const token = Math.round((fiat / (data?.['Matic'] || 0)) * 2) / 2
  return <RecommendationCardPresentationalOnRamp fiat={fiat} token={token} />
}

export const RecommendationCardPresentationalSwap = ({
  native,
  glm,
}: {
  native: number
  glm: number
}) => {
  return (
    <div
      className={`${style.card} text-white py-4 pl-6 mx-8 my-6 flex flex-col gap-1`}
    >
      <div className="text-body-normal ">
        <Trans i18nKey="swapRecommended" ns="layout" />
      </div>
      <div className="flex gap-10 items-center">
        <div className="text-h2">
          {native}
          <div className="text-h3 inline"> MATIC</div>
        </div>
        <div className="text-body-medium">≈ {glm} GLM </div>
      </div>
      <div className="text-c-n">
        <Trans i18nKey="swapRecommendedDescription" ns="layout" />
      </div>
    </div>
  )
}

export const RecommendationCardSwap = () => {
  const balance = useBalance()
  const { data: rates } = useOnboardingExchangeRates()

  const nativeToSwap = Math.round(
    Number(formatEther(balance.NATIVE)) * settings.feesPercentage
  )

  const expectedValue = Math.round((nativeToSwap * rates.GLM) / rates.Matic)
  // const { state } = useOnboarding()

  // const fiat = Math.round(
  //   settings.budgetOptions[state.context.budget] * settings.hourCost
  // )
  // const token = Math.round((fiat / (data?.['Matic'] || 0)) * 2) / 2
  return (
    <RecommendationCardPresentationalSwap
      native={nativeToSwap}
      glm={expectedValue}
    />
  )
}
