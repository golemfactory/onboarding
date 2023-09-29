// components/welcome/intro.tsx
import { motion } from 'framer-motion'
import { MouseEventHandler } from 'react'
import { getGLMToken } from 'utils/getGLMToken'
import onboardingStyle from '../Onboarding.module.css'
import { useLocalStorage } from 'hooks/useLocalStorage'
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

  const addGLM = async () => {
    const { address, decimals, symbol } = await getGLMToken()

    await window.ethereum.request({
      method: 'wallet_watchAsset',
      params: { type: 'ERC20', options: { address, decimals, symbol } },
    })

    setState({ ...store, isGLMTracked: true })

    // goToNextStep()
  }

  return <AddGLMPresentational onConfirm={addGLM} />
}
