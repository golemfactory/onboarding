import { PropsWithChildren } from 'react'
import style from './Card.module.css'

export const Card = ({
  children,
  className,
}: PropsWithChildren<{ className: string }>) => {
  return <div className={`${style.card} ${className}`}>{children}</div>
}
