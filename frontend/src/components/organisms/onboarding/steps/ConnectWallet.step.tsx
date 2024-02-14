import { Button, Trans } from 'components/atoms'
import stepStyle from './ConnectWallet.step.module.css'
import { useWeb3Modal } from '@web3modal/wagmi/react'

import { queryShadowRootDeep } from 'utils/shadowRoot'
import { TooltipProvider } from 'components/providers/Tooltip.provider'

import { useEffect, useState } from 'react'
import { useAccount } from 'hooks/useAccount'
import { useOnboarding } from 'hooks/useOnboarding'
import { Commands } from 'state/commands'
import { motion } from 'framer-motion'
import { useHasFocus } from 'hooks/useHasFocus'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { connect } from 'wagmi/actions'
import { polygon, mainnet } from 'viem/chains'
TooltipProvider.registerTooltip({
  id: 'connect-wallet',
  tooltip: {
    sections: ['explainMetamask', 'explainTrustWallet', 'explainChoose'],
    appearance: 'primary',
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
  setTimeout(() => {
    ;['All Wallets', 'WalletConnect', 'Coinbase', 'Browser Wallet'].forEach(
      (w) => {
        try {
          hideWallet(w)
        } catch (err) {}
      }
    )
  }, 0)
}

const ConnectWalletPresentational = ({
  openWeb3Modal,
}: {
  openWeb3Modal: () => void
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        transition: {
          delay: 1,
          duration: 1,
        },
      }}
      exit={{
        opacity: 0,
      }}
      className="text-neutrals-grey-300  font-light"
    >
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
    </motion.div>
  )
}

export const ConnectWallet = () => {
  const { open } = useWeb3Modal()
  const { address } = useAccount()
  const { send } = useOnboarding()
  const hasFocus = useHasFocus()
  const [shouldReload, setShouldReload] = useState(false)
  const [shouldConnect, setShouldConnect] = useState(false)

  useEffect(() => {
    if (shouldConnect) {
      connect({
        chainId: polygon.id,
        connector: new InjectedConnector({
          chains: [polygon, mainnet],
        }),
      })
      setShouldConnect(false)
    }
  }, [shouldConnect])
  useEffect(() => {
    if (address) {
      send({ type: Commands.NEXT })
    }
  }, [address])

  useEffect(() => {
    if (!hasFocus) {
      setShouldReload(true)
    }
  }, [hasFocus])

  useEffect(() => {
    if (hasFocus && shouldReload) {
      setShouldReload(false)
      setShouldConnect(true)
      window.location.reload()
    }
  }, [hasFocus])

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
