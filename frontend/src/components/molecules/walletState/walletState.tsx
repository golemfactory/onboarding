import { WalletProvider, WalletProviderType } from 'hooks/useWallet'
import { EthereumAddress } from 'types/ethereum'
import { match } from 'ts-pattern'
import { MetamaskIcon, TrustWalletIcon } from 'components/atoms/icons'
import { Trans } from 'components/atoms'

import style from './walletState.module.css'

export const AccountCategory = {
  BROWSER_WALLET: 'browserWallet',
  YAGNA: 'yagnaWallet',
} as const

export type AccountCategoryType =
  (typeof AccountCategory)[keyof typeof AccountCategory]

export const WalletState = ({
  category,
  address,
  provider,
}: {
  category: AccountCategoryType
  address: EthereumAddress
  provider?: WalletProviderType
}) => {
  console.log(category, provider)
  return (
    <div className="flex pl-8 flex-col items-start gap-8">
      <div className="flex items-center gap-4">
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
            () => <TrustWalletIcon />
          )
          .otherwise(() => {
            return ''
          })}

        <div className="flex flex-col justify-center items-start gap-1">
          <div className="text-neutral-grey-300 text-c-xs whitespace-nowrap">
            <Trans i18nKey="walletAddress" ns="layout" /> {address.slice(0, 6)}
            ...{address.slice(-4)}
          </div>
          <div className="text-h6 ">
            <Trans i18nKey={category} ns="layout" />
          </div>
        </div>
      </div>
    </div>
  )
}
