import { FC } from 'react'
import { LayoutPropsType } from 'types/ui'

import style from './Layout.module.css'

const Ellipses = () => {
  return (
    <div>
      <div className={style.ellipse_1}></div>
      <div className={style.ellipse_2}></div>
      <div className={style.ellipse_3}></div>
    </div>
  )
}

export const LayoutTemplate: FC<LayoutPropsType> = () => {
  return (
    <main>
      <Ellipses />
    </main>
  )
}
