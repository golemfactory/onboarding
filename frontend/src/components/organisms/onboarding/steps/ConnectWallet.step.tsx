import { Button, Trans } from 'components/atoms'
import stepStyle from './ConnectWallet.step.module.css'
import { useWeb3Modal } from '@web3modal/wagmi/react'

import { queryShadowRootDeep } from 'utils/shadowRoot'
import { TooltipProvider } from 'components/providers/Tooltip.provider'

TooltipProvider.registerTooltip({
  id: 'connect-wallet',
  tooltip: {
    sections: ['explainMetamask', 'explainTrustWallet', 'explainChoose'],
  },
})

const adjustWeb3ModalContent = () => {
  const pathToContent = [
    { selector: 'w3m-modal', useShadowRoot: true },
    { selector: 'wui-flex', useShadowRoot: false },
    { selector: 'wui-card', useShadowRoot: false },
    { selector: 'w3m-router', useShadowRoot: true },
    { selector: 'div', useShadowRoot: false },
    { selector: 'w3m-connect-view', useShadowRoot: true },
    { selector: 'wui-flex', useShadowRoot: false },
  ]

  const hideWallet = (name: string) => {
    const allWallets = queryShadowRootDeep([
      ...pathToContent,
      {
        selector: `wui-list-wallet[name="${name}"]`,
        useShadowRoot: false,
      },
    ])
    if (!(allWallets instanceof HTMLElement)) {
      throw new Error('All wallets not found')
    }
    allWallets.hidden = true
  }

  ;['All Wallets', 'WalletConnect', 'Browser Wallet', 'Coinbase'].forEach(
    hideWallet
  )
}

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
  const { open } = useWeb3Modal()
  return (
    <ConnectWalletPresentational
      openWeb3Modal={() => {
        open()
        setTimeout(() => {
          adjustWeb3ModalContent()
        }, 0)
      }}
    />
  )
}
