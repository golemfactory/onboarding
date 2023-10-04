// components/welcome/intro.tsx
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { RampInstantSDK } from '@ramp-network/ramp-instant-sdk'
import { hideRampBackground } from 'utils/hideRampBackground'
import { useMetaMask } from 'components/providers/Metamask.provider'
import debug from 'debug'

const variants = {
  show: { opacity: 1 },
  hidden: { opacity: 0 },
}
const OnRampPresentational = () => {
  return (
    <div className="text-center">
      <motion.h1
        className="text-4xl font-bold mb-4 text-gray-800"
        variants={variants}
      ></motion.h1>
      <motion.p
        className="max-w-md text-gray-600 my-4 text-lg"
        variants={variants}
      ></motion.p>
    </div>
  )
}

export const OnRamp = ({ goToNextStep }: { goToNextStep: () => void }) => {
  const metamask = useMetaMask()
  const account = metamask.wallet.accounts[0]
  const widgetRef = useRef<RampInstantSDK | null>(null)

  const [done, setDone] = useState(false)

  useEffect(() => {
    if (account && !done) {
      setDone(true)

      debug('creating widget')

      widgetRef.current = new RampInstantSDK({
        hostAppName: 'onboarding',
        hostLogoUrl: `${window.location.origin}/onboarding/logo.svg`,
        hostApiKey: '9the9ervmr72ezz6fwaxus72y3h2w5p47j9u8m9o',
        url: 'https://app.demo.ramp.network',
        swapAsset: 'MATIC_MATIC',
        fiatValue: '6',
        fiatCurrency: 'EUR',
        userAddress: account,
        defaultFlow: 'ONRAMP',
      })

      //TODO : fix this
      setTimeout(() => {
        widgetRef.current?.show()
      }, 0)

      widgetRef.current.on('*', (event) => {
        debug('event')
        debug(event.type)
        if (event.type === 'WIDGET_CLOSE') {
          setTimeout(() => {
            goToNextStep()
          }, 0)
        }
      })
      debug('setting done')
    }

    hideRampBackground()
  }, [account, done, goToNextStep, widgetRef])

  return <OnRampPresentational />
}
