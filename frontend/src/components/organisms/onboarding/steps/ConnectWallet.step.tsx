import { Button, Trans } from 'components/atoms'
import stepStyle from './ConnectWallet.step.module.css'
import { useWeb3Modal } from '@web3modal/wagmi/react'

import { queryShadowRootDeep, queryShadowRootDeepAll } from 'utils/shadowRoot'
import { TooltipProvider } from 'components/providers/Tooltip.provider'
import { config as wagmiConfig } from 'components/providers/Blockchain.provider'
import { useEffect, useState } from 'react'
import { useAccount } from 'hooks/useAccount'
import { useOnboarding } from 'hooks/useOnboarding'
import { Commands } from 'state/commands'
import { motion } from 'framer-motion'
import { useHasFocus } from 'hooks/useHasFocus'
import { injected } from 'wagmi/connectors'
import { connect } from '@wagmi/core'
import { useLocalStorage } from 'usehooks-ts'
TooltipProvider.registerTooltip({
  id: 'connect-wallet',
  tooltip: {
    sections: ['explainMetamask', 'explainTrustWallet', 'explainChoose'],
    appearance: 'primary',
  },
})

const getAllDisplayedWallets = (
  pathToContent: {
    selector: string
    useShadowRoot: boolean
  }[]
) => {
  const wallets = queryShadowRootDeepAll([
    ...pathToContent,
    { selector: 'wui-list-wallet', useShadowRoot: false },
  ])
  return wallets
}

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

  const allWallets = getAllDisplayedWallets(pathToContent)

  const duplicatedWallets: HTMLElement[] = []
  const processedNames: string[] = []

  allWallets.forEach(
    //@ts-ignore
    (wallet: HTMLElement) => {
      if (processedNames.includes(wallet.getAttribute('name') ?? '')) {
        duplicatedWallets.push(wallet)
      }
      processedNames.push(wallet.getAttribute('name') ?? '')
    }
  )

  const hideWalletByName = (name: string) => {
    const wallet = queryShadowRootDeep([
      ...pathToContent,
      {
        selector: `wui-list-wallet[name="${name}"]`,
        useShadowRoot: false,
      },
    ])
    if (!(wallet instanceof HTMLElement)) {
      throw new Error('wallet not found')
    }
    wallet.hidden = true
  }
  setTimeout(() => {
    duplicatedWallets.forEach((wallet) => {
      wallet.hidden = true
    })
    ;['All Wallets', 'WalletConnect', 'Coinbase', 'Browser Wallet'].forEach(
      (w) => {
        try {
          hideWalletByName(w)
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
  const { address } = useAccount(false)
  const { send } = useOnboarding()
  const hasFocus = useHasFocus()
  const [shouldTrackFocus, setShouldTrackFocus] = useState(false)
  const [shouldReload, setShouldReload] = useLocalStorage(
    'shouldReload',
    false,
    //It's important to not that with false useLocalStorage initialise with initial value
    //instead of persisted value and read it and update afterwards in useEffect
    {
      initializeWithValue: true,
    }
  )

  const [shouldConnect, setShouldConnect] = useLocalStorage(
    'shouldAutoConnect',
    true
  )

  useEffect(() => {
    // console.log('dupa', shouldConnect)
    if (shouldConnect) {
      try {
        connect(wagmiConfig, {
          connector: injected(),
        })
      } catch (e) {
        console.error(e)
      }
    }
    setShouldConnect(false)
  }, [shouldConnect])
  useEffect(() => {
    if (address) {
      send({ type: Commands.NEXT })
    }
  }, [address])

  useEffect(() => {
    if (!hasFocus && shouldTrackFocus) {
      setShouldReload(true)
    }
  }, [hasFocus])

  useEffect(() => {
    if (hasFocus && shouldReload) {
      setShouldReload(false)
      // setShouldConnect(true)
      window.location.reload()
    }
  }, [hasFocus])

  return (
    <ConnectWalletPresentational
      openWeb3Modal={() => {
        open()
        setShouldTrackFocus(true)
        setTimeout(() => {
          adjustWeb3ModalContent()
        }, 0)
      }}
    />
  )
}
