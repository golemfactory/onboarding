import { FC, ReactNode } from 'react'
import { motion } from 'framer-motion'

type Props = {
  children?: React.ReactNode
}

import styles from './Onboarding.module.css'

export const OnboardingStep: FC<Props> = ({ children }) => {
  return (
    <motion.div
      className={`${styles.onboardingStep} fixed inset-0 flex items-center justify-center bg-golemblue`}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, type: 'spring' }}
    >
      <motion.div
        variants={{
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 1.5,
            },
          },
        }}
        initial="hidden"
        animate="show"
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
