import { motion } from 'framer-motion'
import { MouseEventHandler } from 'react'
import onboardingStyle from '../Onboarding.module.css'

const variants = {
  show: { opacity: 1 },
  hidden: { opacity: 0 },
}
const NotSupportedPresentational = ({
  onConfirm,
}: {
  onConfirm: MouseEventHandler
}) => {
  return (
    <div className={onboardingStyle.step}>
      <motion.h1 className={onboardingStyle.title} variants={variants}>
        Gasless swap not supported yet
      </motion.h1>
      <motion.p className={onboardingStyle.description} variants={variants}>
        We will temporary redirect you to the Ramp to exchange fiat to Matic
      </motion.p>
      <motion.button
        className={onboardingStyle.button}
        variants={variants}
        onClick={(e) => {
          onConfirm(e)
        }}
      >
        Go
      </motion.button>
    </div>
  )
}

export const NotSupported = ({
  goToNextStep,
}: {
  goToNextStep: MouseEventHandler
}) => {
  return <NotSupportedPresentational onConfirm={goToNextStep} />
}
