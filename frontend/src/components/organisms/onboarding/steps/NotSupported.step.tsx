import { motion } from 'framer-motion'
import { MouseEventHandler } from 'react'
import onboardingStyle from '../Onboarding.module.css'
import { use0x } from 'hooks/use0x'

const variants = {
  show: { opacity: 1 },
  hidden: { opacity: 0 },
}
const NotSupportedPresentational = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onConfirm,
  swap,
}: {
  onConfirm: MouseEventHandler
  swap: () => void
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
        onClick={() => {
          swap()
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
  const { swap } = use0x()

  return <NotSupportedPresentational onConfirm={goToNextStep} swap={swap} />
}
