// components/welcome/intro.tsx
import { motion } from 'framer-motion'
import { MouseEventHandler, useEffect } from 'react'
import onboardingStyle from '../Onboarding.module.css'
import { useLocalStorage } from 'hooks/useLocalStorage'
import { useWatchGLM } from 'hooks/useWatchGLM'
const variants = {
  show: { opacity: 1 },
  hidden: { opacity: 0 },
}
const AddGLMPresentational = ({
  onConfirm,
}: {
  onConfirm: MouseEventHandler
}) => {
  return (
    <div className={onboardingStyle.step}>
      <motion.h1 className={onboardingStyle.title} variants={variants}>
        Add GLM to wallet
      </motion.h1>
      <motion.p className={onboardingStyle.description} variants={variants}>
        We need to be sure you track your GLM balance in your wallet
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

export const AddGLM = ({ goToNextStep }: { goToNextStep: () => void }) => {
  const [store, setState] = useLocalStorage('onboarding', {})

  const { watch, success } = useWatchGLM()

  const addGLM = async () => {
    watch()
  }

  useEffect(() => {
    if (success) {
      setState({ ...store, addGLM: true })
      goToNextStep()
    }
  }, [success])

  return <AddGLMPresentational onConfirm={addGLM} />
}
