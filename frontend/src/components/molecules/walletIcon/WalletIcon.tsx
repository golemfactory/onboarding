import { MetamaskIcon, TrustWalletIcon } from 'components/atoms/icons'
import { useWallet, WalletProvider } from 'hooks/useWallet'
import { ComponentProps } from 'react'

export const WalletIcon = (props: ComponentProps<'img'>) => {
  const wallet = useWallet()

  return wallet === WalletProvider.METAMASK ? (
    <MetamaskIcon {...props} />
  ) : (
    <TrustWalletIcon {...props} />
  )
}
