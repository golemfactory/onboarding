// components/welcome/intro.tsx
import { motion } from 'framer-motion'

const variants = {
  show: { opacity: 1 },
  hidden: { opacity: 0 },
}
const FinishPresentational = () => {
  return (
    <div className="text-center">
      <motion.h1
        className="text-4xl font-bold mb-4 text-black"
        variants={variants}
      >
        All good
      </motion.h1>
      <motion.p
        className="max-w-md text-black my-4 text-xl"
        variants={variants}
      >
        You are ready to use Golem network now
      </motion.p>
    </div>
  )
}

export const Finish = () => {
  return <FinishPresentational />
}
