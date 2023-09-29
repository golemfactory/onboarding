import { motion } from 'framer-motion'
import { FC } from 'react'
import style from './theme.module.css'

const variants = {
  show: { opacity: 1 },
  hidden: { opacity: 0 },
}

import { StepPropsType } from 'types/ui'

export const StepTemplate: FC<StepPropsType> = ({
  onConfirm,
  title,
  content,
  buttonText,
}: StepPropsType) => {
  return (
    <div className={style.step}>
      <motion.h1 className={style.title} variants={variants}>
        {title}
      </motion.h1>
      <motion.div className={style.description} variants={variants}>
        {content}
      </motion.div>
      <motion.button
        className={style.button}
        variants={variants}
        onClick={onConfirm}
      >
        {buttonText}
      </motion.button>
    </div>
  )
}
