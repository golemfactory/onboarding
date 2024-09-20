import { WalletProvider, WalletProviderType } from 'hooks/useWallet'
import { EthereumAddress } from 'types/ethereum'
import { match } from 'ts-pattern'
import {
  EthereumIcon,
  GolemCoinIcon,
  MetamaskIcon,
  TrustWalletIcon,
} from 'components/atoms/icons'
import { Trans } from 'components/atoms'

import style from './walletState.module.css'
import { useBalance } from 'hooks/useBalance'
import { formatBalance } from 'utils/formatBalance'
import { MaticCoinSolidIcon } from 'components/atoms/icons/matic.icon'
import { useNetwork } from 'hooks/useNetwork'
import {
  InfoTooltip,
  InfoTooltipTrigger,
} from 'components/organisms/tooltip/InfoTooltip'
import { TooltipProvider } from 'components/providers/Tooltip.provider'

export const AccountCategory = {
  BROWSER_WALLET: 'browserWallet',
  YAGNA: 'yagnaWallet',
} as const

export type AccountCategoryType =
  (typeof AccountCategory)[keyof typeof AccountCategory]

TooltipProvider.registerTooltip({
  id: 'yagna',
  tooltip: {
    sections: ['explain'],
    appearance: 'secondary',
  },
})

export const WalletState = ({
  category,
  address,
  provider,
}: {
  category: AccountCategoryType
  address?: EthereumAddress
  provider?: WalletProviderType
}) => {
  const balance = useBalance(address)
  const isNoYagnaCase = category === AccountCategory.YAGNA && !address
  const { chain } = useNetwork()
  if (!chain) {
    throw new Error('No chain')
  }

  const isMatic = chain.id === '0x89'
  const isMainnet = chain.id === '0x1'

  return (
    <div className={`flex pl-8 flex-col items-start gap-8`}>
      <div
        className={`flex items-center gap-4 ${
          isNoYagnaCase ? 'opacity-30' : 'opacity-100'
        }`}
      >
        {match([category, provider])
          .with(
            [AccountCategory.BROWSER_WALLET, WalletProvider.METAMASK],
            () => <MetamaskIcon className="h-10" />
          )
          .with([AccountCategory.YAGNA, undefined], () => (
            <div className="relative">
              <img src="golemWallet.svg" className="h-8" />
              <div
                className={`${style.yagnaLogo} absolute -bottom-0 right-0 text-darkblue-700`}
              >
                YAGNA
              </div>
            </div>
          ))
          .with(
            [AccountCategory.BROWSER_WALLET, WalletProvider.TRUST_WALLET],
            () => <TrustWalletIcon className="h-10" />
          )
          .otherwise(() => {
            return ''
          })}

        <div className="flex flex-col justify-center items-start gap-1">
          <div className="text-neutral-grey-300 text-c-xs whitespace-nowrap">
            <Trans i18nKey="walletAddress" ns="layout" />{' '}
            {address
              ? address.slice(0, 6) + '...' + address.slice(-4)
              : 'unknown'}
          </div>
          <div className="text-h6 ">
            <Trans i18nKey={category} ns="layout" />
          </div>
        </div>
      </div>

      {isNoYagnaCase ? (
        <div className="text-body-normal pr-10 pb-2 font-normal">
          <Trans i18nKey="noYagna" ns="layout" />
          <InfoTooltip id="yagna" appearance="secondary" />
        </div>
      ) : (
        <div className="flex flex-col gap-3 text-body-normal pb-8">
          <div
            className={`${style.currentBalance} text-left text-darkblue-700 uppercase`}
          >
            <Trans i18nKey="currentBalance" ns="layout" />
          </div>
          <div className="flex gap-16">
            <div
              className={`flex gap-1 items-center ${style.tokenIconContainer}`}
            >
              <GolemCoinIcon className="h-6 inline" /> GLM
            </div>
            <div className="text-h7">{formatBalance(balance.GLM)}</div>
          </div>
          <div className=" flex gap-16">
            <div
              className={`flex gap-1 items-center ${style.tokenIconContainer}`}
            >
              {isMatic ? (
                <MaticCoinSolidIcon className="h-6 inline" />
              ) : (
                <EthereumIcon className="h-6 inline" />
              )}

              {isMainnet ? 'ETH' : 'POL'}
            </div>
            <div className="text-h7">{formatBalance(balance.NATIVE)}</div>
          </div>
        </div>
      )}
    </div>
  )
}
