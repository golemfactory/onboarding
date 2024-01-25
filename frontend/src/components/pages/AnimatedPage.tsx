import { PropsWithChildren } from 'react'
import { motion } from 'framer-motion'

const duration = 0.6
const pageVariants = {
  initial: {
    opacity: 0,
    x: '100vw',
    transition: {
      duration,
    },
  },
  in: {
    opacity: 1,
    x: 0,
    transition: {
      duration,
      delay: duration,
    },
  },
  out: { opacity: 0, x: '-100vw', transition: { duration } },
}

const pageTransition = {
  duration: 10,
  type: 'ease',
}

export const AnimatedPage = (props: PropsWithChildren) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="h-full flex flex-col"
    >
      {props.children}
    </motion.div>
  )
}
