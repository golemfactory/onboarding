'utils/formatBalance'
import { useSetup } from 'components/providers'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { Trans } from 'components/atoms'

import style from './Finish.step.module.css'
import {
  AccountCategory,
  WalletState,
} from 'components/molecules/walletState/walletState'
import { useWallet } from 'hooks/useWallet'
import { EthereumAddress } from 'types/ethereum'
import { useAccount } from 'hooks/useAccount'
import { RightDot } from 'components/atoms/ornaments/rightDot'

const FinishPresentational = ({
  walletProvider,
  address,
  yagnaAddress,
}: {
  yagnaAddress: EthereumAddress
  address: EthereumAddress
  walletProvider: ReturnType<typeof useWallet>
}) => {
  return (
    <div>
      <RightDot top={'400px'} />
      <div className="justify-center flex flex-col text-center gap-3">
        <CheckCircleIcon className=" h-10 text-success-100" />
        <div className="text-h1">
          <Trans i18nKey="congratulations" ns="finish.step" />
        </div>
        <div className="text-h4">
          <Trans i18nKey="successMessage" ns="finish.step" />
        </div>
        <div className="flex justify-center">
          <div className={style.fadingLine}></div>
        </div>
        <div className="text-h4 mb-16">
          <Trans i18nKey="walletsSummary" ns="finish.step" />
        </div>
        <div className="grid grid-cols-12 gap-4">
          <div className={`col-span-4 col-start-3 ${style.wrapper}`}>
            <div className={`${style.card} `}>
              <WalletState
                category={AccountCategory.BROWSER_WALLET}
                provider={walletProvider}
                address={address}
              />
            </div>
          </div>
          <div className={`col-span-4  ${style.wrapper}`}>
            <div className={`bg-lightblue-200 ${style.card} `}>
              <WalletState
                category={AccountCategory.YAGNA}
                address={yagnaAddress}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const Finish = () => {
  const walletProvider = useWallet()
  const { address } = useAccount()
  const { yagnaAddress } = useSetup()

  if (!address) {
    throw new Error('Address is not defined')
  }
  if (!yagnaAddress) {
    throw new Error('Yagna address is not defined')
  }

  return (
    <div className="col-span-12 text-primary">
      <FinishPresentational
        walletProvider={walletProvider}
        address={address}
        yagnaAddress={yagnaAddress}
      />
    </div>
  )
}
