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
import { useNetwork } from 'hooks/useNetwork'
import { InfoTooltipTrigger } from 'components/organisms/tooltip/InfoTooltip'

export const Trans = ({
  components,
  ...rest
}: ComponentProps<typeof TransComponent>) => {
  const { chain } = useNetwork()
  return (
    <TransComponent
      {...rest}
      values={{
        chain: chain?.name,
        token: chain?.nativeCurrency?.symbol,
        ...rest?.values,
      }}
      components={{
        ...components,
        //@ts-ignore
        span: <span onClick={rest?.values?.onClick}></span>,
        a: <a className="font-medium underline"></a>,
        ul: <ul className="list-disc list-inside"></ul>,
        li: <li className="mb-2"></li>,
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
        UniswapIcon: <UniswapIcon className="inline w-6" />,
        RampIcon: <RampIcon className="inline" />,
        Heart: <img src="heart.svg" className="inline h-line-1.5" />,
        walletIcon: <WalletIcon className="w-6 inline" />,
        walletConnectIcon: (
          <img src="walletconnect.png" className="inline w-6" />
        ),
        yagnaTooltip: <InfoTooltipTrigger id="yagna" appearance="secondary" />,
      }}
    />
  )
}
