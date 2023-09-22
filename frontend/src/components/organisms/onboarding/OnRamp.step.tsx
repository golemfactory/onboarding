// components/welcome/intro.tsx
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { RampInstantSDK } from '@ramp-network/ramp-instant-sdk'
import { hideRampBackground, hideRampWidget } from 'utils/hideRampBackground'
import { useMetaMask } from 'components/providers/MetamaskProvider'
import debug from 'debug'

const log = debug('ramp')
//@ts-ignore
window.ramp = RampInstantSDK

const variants = {
  show: { opacity: 1 },
  hidden: { opacity: 0 },
}
const OnRampPresentational = ({ onConfirm }: { onConfirm: () => {} }) => {
  return (
    <div className="text-center">
      <motion.h1 className="text-4xl font-bold mb-4 text-gray-800" variants={variants}></motion.h1>
      <motion.p className="max-w-md text-gray-600 my-4 text-lg" variants={variants}></motion.p>
    </div>
  )
}

export const OnRamp = ({ goToNextStep }: { goToNextStep: () => {} }) => {
  const metamask = useMetaMask()
  const account = metamask.wallet.accounts[0]
  let widget: RampInstantSDK | null = null

  const [done, setDone] = useState(false)

  useEffect(() => {
    if (account && !done) {
      debug('creating widget')
      widget = new RampInstantSDK({
        hostAppName: 'Your App',
        hostLogoUrl: 'https://assets.ramp.network/misc/test-logo.png',
        hostApiKey: '9the9ervmr72ezz6fwaxus72y3h2w5p47j9u8m9o',
        url: 'https://app.demo.ramp.network',
        swapAsset: 'MATIC_MATIC',
        fiatValue: '6',
        fiatCurrency: 'EUR',
        userAddress: account,
      })
      widget.show()

      widget.on('*', (event) => {
        debug('event')
        debug(event.type)
        if (event.type === 'WIDGET_CLOSE') {
          goToNextStep()
          debug('closing widget')
          hideRampWidget()
        }
      })
      debug('setting done')
      setDone(true)
    }

    hideRampBackground()
  }, [account, done])

  return <OnRampPresentational onConfirm={goToNextStep} />
}
