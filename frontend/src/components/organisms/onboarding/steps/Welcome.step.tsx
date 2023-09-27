// components/welcome/intro.tsx
import { motion } from 'framer-motion'
import { MouseEventHandler } from 'react'
import onboardingStyle from '../Onboarding.module.css'

const variants = {
  show: { opacity: 1 },
  hidden: { opacity: 0 },
}
const WelcomePresentational = ({
  onConfirm,
}: {
  onConfirm: MouseEventHandler
}) => {
  return (
    <div className={onboardingStyle.step}>
      <motion.h1 className={onboardingStyle.title} variants={variants}>
        Welcome to Golem
      </motion.h1>
      <motion.p className={onboardingStyle.description} variants={variants}>
        Golem network is a decentralized sharing economy of computing power.
      </motion.p>
      <motion.button
        className={onboardingStyle.button}
        variants={variants}
        onClick={(e) => {
          onConfirm(e)
        }}
      >
        Get Started
      </motion.button>
    </div>
  )
}

export const Welcome = ({ goToNextStep }: { goToNextStep: () => void }) => {
  return (
    <WelcomePresentational
      onConfirm={() => {
        goToNextStep()
      }}
    />
  )
}
