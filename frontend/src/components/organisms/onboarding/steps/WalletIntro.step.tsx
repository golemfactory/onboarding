/**
 * @deprecated
 */

import { motion } from 'framer-motion'
import { MouseEventHandler } from 'react'

import onboardingStyle from '../Onboarding.module.css'

const variants = {
  show: { opacity: 1 },
  hidden: { opacity: 0 },
}

const WalletIntroPresentational = ({
  onConfirm,
}: {
  onConfirm: MouseEventHandler
}) => {
  return (
    <div className={onboardingStyle.step}>
      <motion.h1 className={onboardingStyle.title} variants={variants}>
        Metamask connection
      </motion.h1>
      <motion.p className={onboardingStyle.description} variants={variants}>
        First you need to make sure you have Metamask wallet installed and
        connected
      </motion.p>
      <motion.button
        className={onboardingStyle.button}
        variants={variants}
        onClick={(e) => {
          onConfirm(e)
        }}
      >
        Continue
      </motion.button>
    </div>
  )
}

export const WalletIntro = ({ goToNextStep }: { goToNextStep: () => void }) => {
  return (
    <WalletIntroPresentational
      onConfirm={() => {
        goToNextStep()
      }}
    />
  )
}
