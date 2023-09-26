// components/welcome/intro.tsx
import { motion } from 'framer-motion'
import { MouseEventHandler, useContext } from 'react'
import onboardingStyle from './Onboarding.module.css'
import { OnboardingContext } from 'components/providers/Onboarding.provider'
import { Commands } from 'state/commands'
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
  const { categoryService } = useContext(OnboardingContext)
  console.log(categoryService)
  //@ts-ignore
  const send = categoryService[1]

  return (
    <WelcomePresentational
      onConfirm={() => {
        send(Commands.NEXT)
        goToNextStep()
      }}
    />
  )
}
