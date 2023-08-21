import { FC } from 'react'
import { motion } from 'framer-motion'

type Props = {
  children?: React.ReactNode
}

import styles from './Onboarding.module.css'

export const OnboardingStep: FC<Props> = ({ children }) => {
  return (
    <motion.div
      className={`${styles.onboardingStep} fixed inset-0 flex items-center justify-center bg-golemblue`}
      variants={{
        show: {
          opacity: 1,
          transition: {
            staggerChildren: 0.7,
          },
        },
      }}
      initial="hidden"
      animate="show"
      exit="hidden"
    >
      {children}
    </motion.div>
  )
}
