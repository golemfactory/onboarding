import { Button, Trans } from 'components/atoms'
import stepStyle from './ConnectWallet.step.module.css'
import { useWeb3Modal } from '@web3modal/wagmi/react'

import { queryShadowRootDeep } from 'utils/shadowRoot'

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

// // components/welcome/intro.tsx
// import { motion } from 'framer-motion'
// import { MouseEventHandler, useEffect, useState } from 'react'
// import { useWeb3Modal } from '@web3modal/wagmi/react'
// import { useAccount } from 'hooks/useAccount'
// import { Step } from 'state/steps'
// import onboardingStyle from '../Onboarding.module.css'

// const variants = {
//   show: { opacity: 1 },
//   hidden: { opacity: 0 },
// }
// const ConnectWalletPresentational = ({
//   onConfirm,
// }: {
//   onConfirm: MouseEventHandler
// }) => {
//   return (
//     <div className={onboardingStyle.step}>
//       <motion.h1
//         className="text-4xl font-bold mb-4 text-black"
//         variants={variants}
//       >
//         Wallet connection
//       </motion.h1>
//       <motion.p
//         className="max-w-md text-black my-4 text-xl"
//         variants={variants}
//       >
//         To proceed further, please connect your cryptocurrency wallet.
//       </motion.p>
//       <motion.button
//         className={onboardingStyle.button}
//         variants={variants}
//         onClick={(e) => {
//           onConfirm(e)
//         }}
//       >
//         Connect wallet
//       </motion.button>
//     </div>
//   )
// }

// export const ConnectWallet = ({
//   goToNextStep,
// }: {
//   goToNextStep: () => void
// }) => {
//   const { open } = useWeb3Modal()
//   const { address } = useAccount()

//   const [done, setDone] = useState(false)

//   useEffect(() => {
//     if (done && address) {
//       goToNextStep()
//     }
//   }, [done, address])

//   return (
//     <ConnectWalletPresentational
//       onConfirm={() => {
//         setDone(true)
//         open()
//         setTimeout(() => {
//           const x = queryShadowRootDeep([
//             { selector: 'w3m-modal', useShadowRoot: true },
//             { selector: 'wui-flex', useShadowRoot: false },
//             { selector: 'wui-card', useShadowRoot: false },
//             { selector: 'w3m-router', useShadowRoot: true },
//             { selector: 'div', useShadowRoot: false },
//             { selector: 'w3m-connect-view', useShadowRoot: true },
//             { selector: 'wui-flex', useShadowRoot: false },
//             {
//               selector: 'wui-list-wallet[name="All Wallets"]',
//               useShadowRoot: false,
//             },
//           ])
//           x.hidden = true
//           const y = queryShadowRootDeep([
//             { selector: 'w3m-modal', useShadowRoot: true },
//             { selector: 'wui-flex', useShadowRoot: false },
//             { selector: 'wui-card', useShadowRoot: false },
//             { selector: 'w3m-router', useShadowRoot: true },
//             { selector: 'div', useShadowRoot: false },
//             { selector: 'w3m-connect-view', useShadowRoot: true },
//             { selector: 'wui-flex', useShadowRoot: false },
//             {
//               selector: 'wui-list-wallet[name="WalletConnect"]',
//               useShadowRoot: false,
//             },
//           ])
//           y.hidden = true
//           const z = queryShadowRootDeep([
//             { selector: 'w3m-modal', useShadowRoot: true },
//             { selector: 'wui-flex', useShadowRoot: false },
//             { selector: 'wui-card', useShadowRoot: false },
//             { selector: 'w3m-router', useShadowRoot: true },
//             { selector: 'div', useShadowRoot: false },
//             {
//               selector: 'w3m-connect-view',
//               useShadowRoot: true,
//             },
//             { selector: 'wui-flex', useShadowRoot: false },
//             {
//               selector: 'wui-list-wallet[name="MetaMask"]',
//               useShadowRoot: false,
//             },
//           ])

//           z.style.backgroundColor = 'pink'

//           const w = queryShadowRootDeep([
//             { selector: 'w3m-modal', useShadowRoot: true },
//             { selector: 'wui-flex', useShadowRoot: false },
//             { selector: 'wui-card', useShadowRoot: false },
//             { selector: 'w3m-router', useShadowRoot: true },
//             { selector: 'div', useShadowRoot: false },
//             { selector: 'w3m-connect-view', useShadowRoot: true },
//             { selector: 'wui-flex', useShoadowRoot: false },
//             { selector: 'wui-list-wallet[name="MetaMask"]' },
//           ]).shadowRoot.querySelector('wui-tag')

//           w.textContent = 'JESTEM PIEKNY I RÓŻOWY'
//           w.style.color = 'blue'
//         }, 0)

//         localStorage.setItem('OnboardingStep', Step.CONNECT_WALLET)
//       }}
//     />
//   )
// }
