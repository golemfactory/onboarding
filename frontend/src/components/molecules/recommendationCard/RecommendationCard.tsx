import { Trans } from 'components/atoms'
import style from './RecommendationCard.module.css'
import { settings } from 'settings'
import { useOnboarding, useOnboardingSnapshot } from 'hooks/useOnboarding'
import { useOnboardingExchangeRates } from 'hooks/useRate'
import { useBalance } from 'hooks/useBalance'
import { useNetwork } from 'hooks/useNetwork'
import { NativeTokenType } from 'types/ethereum'
import { getNativeToken, getTokenName } from 'utils/getNativeToken'
import { formatEther } from 'utils/formatEther'
import { Chain } from 'types/wagmi'

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
  const precision = chain?.id === '0x1' ? 1000 : 8
  const nativeToken = getNativeToken(chain.id)
  const value =
    Math.round(
      (fiat - settings.rampFee) * (data?.['Native'] || 0) * precision
    ) / precision
  return (
    <RecommendationCardPresentationalOnRamp
      fiat={fiat}
      token={{
        value: value,
        symbol: nativeToken,
      }}
    />
  )
}

export const RecommendationCardPresentationalSwap = ({
  native,
  glm,
  chain,
}: {
  native: number
  glm: number
  chain: Chain
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
          <div className="text-h3 inline"> {chain.nativeCurrency.symbol}</div>
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
  const { data: rates } = useOnboardingExchangeRates()
  const { boughtNative } = useOnboardingSnapshot()
  const { chain } = useNetwork()
  if (!chain) {
    throw new Error('No chain')
  }
  const nativeToSwap =
    Math.round(10 * Number(boughtNative * (1 - settings.feesPercentage))) / 10
  const expectedValue = Math.round((nativeToSwap * rates.GLM) / rates.Native)

  return (
    <RecommendationCardPresentationalSwap
      native={nativeToSwap}
      glm={expectedValue}
      chain={chain}
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
  nativeToken: NativeTokenType
}) => {
  return (
    <div
      className={`${style.card} text-white py-4 px-6 mx-8 my-6 flex flex-col gap-1`}
    >
      <div className="text-body-normal ">
        <Trans i18nKey="transferRecommended" ns="layout" />
      </div>
      <div className="grid grid-cols-12  items-center ">
        <div className="text-h2 col-span-7 flex gap-2 items-baseline pr-7">
          {amounts.GLM}
          <div className="text-h3 inline"> GLM</div>
        </div>
        <div className="text-c-n col-span-5">
          <Trans i18nKey="GLMDescription" ns="layout" />
        </div>
      </div>

      <div className="grid grid-cols-12  items-center ">
        <div className="text-h2 col-span-7 flex gap-2 items-baseline pr-7">
          {amounts.NATIVE}
          <div className="text-h3 inline uppercase">
            {' '}
            {getTokenName(nativeToken)}
          </div>
        </div>
        <div className="text-c-n col-span-5">
          <Trans i18nKey="NativeDescription" ns="layout" />
        </div>
      </div>
    </div>
  )
}

export const RecommendationCardTransfer = () => {
  const { chain } = useNetwork()
  const balance = useBalance()
  const { boughtNative, boughtGLM } = useOnboardingSnapshot()
  //TODO move checking of chain to hook
  if (!chain) {
    throw new Error('np chain')
  }

  const nativeToken = getNativeToken(chain.id)

  const amounts = {
    GLM: boughtGLM,
    NATIVE:
      Math.round(
        Math.min(
          boughtNative * settings.feesPercentage,
          Number(formatEther({ wei: balance.NATIVE }))
        ) * 10
      ) / 10,
  }

  return (
    <RecommendationCardPresentationalTransfer
      amounts={amounts}
      nativeToken={nativeToken}
    />
  )
}
