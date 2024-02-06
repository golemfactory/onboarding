import { Trans as TransComponent } from 'react-i18next'
import { ComponentProps } from 'react'
import {
  EthereumIcon,
  GolemSmallIcon,
  MaticCoinIcon,
  MaticIcon,
  MetamaskIcon,
  RampIcon,
  TrustWalletIcon,
} from '../icons'
import { UniswapIcon } from '../icons/uniswap.icon'
import { WalletIcon } from 'components/molecules/walletIcon/WalletIcon'

export const Trans = ({
  components,
  ...rest
}: ComponentProps<typeof TransComponent>) => {
  return (
    <TransComponent
      {...rest}
      components={{
        ...components,
        a: <a></a>,
        b: <b></b>,
        red: <div className="inline text-dangerred-200" />,
        breakLine: <br />,
        golemIcon: (
          <GolemSmallIcon className="inline h-line-1.5 mr-0.5 ml-0.5" />
        ),
        tab: <span className="ml-4" />,
        emptyLine: (
          <>
            <br />
            <br />
          </>
        ),
        ethereumIcon: (
          <EthereumIcon className="inline h-line-1.5 ml-1.5 mr-0.5" />
        ),
        metamaskIcon: <MetamaskIcon className="inline h-line-1.5 p-1" />,
        trustIcon: <TrustWalletIcon className="inline h-line-1.5 pr-1" />,
        maticIcon: <MaticIcon className="inline h-line-1 mr-0.5 ml-1.5" />,
        maticCoinIcon: (
          <MaticCoinIcon className="inline h-line-1 mr-0.5 ml-1" />
        ),
        UniswapIcon: <UniswapIcon className="inline" />,
        RampIcon: <RampIcon className="inline" />,
        Heart: <img src="heart.svg" className="inline h-line-1.5" />,
        walletIcon: <WalletIcon className="w-6 inline" />,
      }}
    />
  )
}
