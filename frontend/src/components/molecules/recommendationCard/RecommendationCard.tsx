import { Trans } from 'components/atoms'
import style from './RecommendationCard.module.css'
import { settings } from 'settings'
import { useOnboarding } from 'hooks/useOnboarding'
import { useOnboardingExchangeRates } from 'hooks/useRate'
import { useBalance } from 'hooks/useBalance'
import { formatEther } from 'viem'
import { useNetwork } from 'hooks/useNetwork'
import { getTokenByCategory } from 'utils/getTokenByNetwrok'
import { NativeTokenType, TokenCategory } from 'types/ethereum'
import { hrtime } from 'process'
import { getNativeToken, getTokenName } from 'utils/getNativeToken'

export const RecommendationCardPresentationalOnRamp = ({
  fiat,
  token,
}: {
  fiat: number
  token: {
    value: number
    symbol: NativeTokenType
  }
}) => {
  return (
    <div
      className={`${style.card} text-white py-4 pl-6 mx-8 flex flex-col gap-1`}
    >
      <div className="text-body-normal ">
        <Trans i18nKey="exchangeRecommended" ns="layout" />
      </div>
      <div className="flex gap-10 items-center">
        <div className="text-h2">
          {fiat}
          <div className="text-h3 inline"> $</div>
        </div>
        <div className="text-body-medium">
          ≈ {token.value} {getTokenName(token.symbol)}
        </div>
      </div>
    </div>
  )
}

export const RecommendationCardOnRamp = () => {
  const { data } = useOnboardingExchangeRates()
  const { state } = useOnboarding()
  const { chain } = useNetwork()
  if (!chain) {
    throw new Error('No chain')
  }
  const fiat = settings.budgetOptions[state.context.budget]
  const precision = chain?.id === '0x1' ? 1000 : 2
  const nativeToken = getNativeToken(chain.id)
  const token =
    Math.round(fiat * (data?.['Native'] || 0) * precision) / precision
  return (
    <RecommendationCardPresentationalOnRamp
      fiat={fiat}
      token={{
        value: token,
        symbol: nativeToken,
      }}
    />
  )
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

const RecommendationCardPresentationalTransfer = ({
  amounts,
  nativeToken,
}: {
  amounts: {
    GLM: number
    NATIVE: number
  }
  nativeToken: string
}) => {
  return (
    <div
      className={`${style.card} text-white py-4 px-6 mx-8 my-6 flex flex-col gap-1`}
    >
      <div className="text-body-normal ">
        <Trans i18nKey="transferRecommended" ns="layout" />
      </div>
      <div className="flex gap-10 items-center justify-end">
        <div className="text-h2 flex gap-2 items-baseline pr-7">
          {amounts.GLM}
          <div className="text-h3 inline"> GLM</div>
        </div>
        <div className="text-c-n">
          <Trans i18nKey="GLMDescription" ns="layout" />
        </div>
      </div>

      <div className="flex gap-10 items-center">
        <div className="text-h2 flex items-baseline gap-2">
          {amounts.NATIVE}
          <div className="text-h3 inline"> {nativeToken}</div>
        </div>
        <div className="text-c-n">
          <Trans i18nKey="NativeDescription" ns="layout" />
        </div>
      </div>
    </div>
  )
}

export const RecommendationCardTransfer = () => {
  const { chain } = useNetwork()
  //TODO move checking of chain to hook
  if (!chain) {
    return null
  }

  const nativeToken = getTokenByCategory(chain.id, TokenCategory.NATIVE).split(
    '_'
  )[0]

  const amounts = {
    GLM: settings.minimalBalance[
      getTokenByCategory(chain.id, TokenCategory.GLM)
    ],
    NATIVE:
      settings.minimalBalance[
        getTokenByCategory(chain.id, TokenCategory.NATIVE)
      ],
  }

  return (
    <RecommendationCardPresentationalTransfer
      amounts={amounts}
      nativeToken={nativeToken}
    />
  )
}
