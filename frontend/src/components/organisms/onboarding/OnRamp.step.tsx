// components/welcome/intro.tsx
import { motion } from 'framer-motion'
import { OnboardingStep } from 'components/templates/OnboardingStep.template'
import { MouseEventHandler, useEffect } from 'react'
import { RampInstantSDK } from '@ramp-network/ramp-instant-sdk'
import { hideRampBackground } from 'utils/hideRampBackground'
import { useSDK } from '@metamask/sdk-react'

const variants = {
  show: { opacity: 1 },
  hidden: { opacity: 0 },
}
const OnRampPresentational = ({ onConfirm }: { onConfirm: MouseEventHandler }) => {
  const { account } = useSDK()
  let widget: RampInstantSDK | null = null

  useEffect(() => {
    if (widget) {
      widget.close()
    }
    if (account) {
      widget = new RampInstantSDK({
        hostAppName: 'Your App',
        hostLogoUrl: 'https://assets.ramp.network/misc/test-logo.png',
        hostApiKey: '9the9ervmr72ezz6fwaxus72y3h2w5p47j9u8m9o',
        url: 'https://app.demo.ramp.network',
        swapAsset: 'MATIC_TEST',
        fiatValue: '0.1',
        fiatCurrency: 'EUR',
        userAddress: account,
      })
      widget.show()
    }

    hideRampBackground()
  }, [account])
  return (
    <div className="text-center">
      <motion.h1 className="text-4xl font-bold mb-4 text-gray-800" variants={variants}></motion.h1>
      <motion.p className="max-w-md text-gray-600 my-4 text-lg" variants={variants}></motion.p>
    </div>
  )
}

export const OnRamp = ({ onConfirm }: { onConfirm: MouseEventHandler }) => {
  return (
    <OnboardingStep>
      <OnRampPresentational onConfirm={onConfirm} />
    </OnboardingStep>
  )
}
