import { Button, Trans } from 'components/atoms'
import stepStyle from './ConnectWallet.step.module.css'
import { useWeb3Modal } from '@web3modal/wagmi/react'

const ConnectWalletPresentational = ({
  openWeb3Modal,
}: {
  openWeb3Modal: () => void
}) => {
  return (
    //inlione style for text as we have mess in typography
    <div className="text-neutrals-grey-300  font-light">
      <Trans i18nKey="legal.walletConnect" ns="connect-wallet.step" />
      <Button
        buttonStyle="solid"
        className={`${stepStyle.button} text-button-large mt-8`}
        useDefault={true}
        onClick={() => {
          openWeb3Modal()
        }}
      >
        <Trans i18nKey="connectWallet" ns="connect-wallet.step" />
      </Button>
    </div>
  )
}

export const ConnectWallet = () => {
  const { open: openWeb3Modal } = useWeb3Modal()
  return <ConnectWalletPresentational openWeb3Modal={openWeb3Modal} />
}
