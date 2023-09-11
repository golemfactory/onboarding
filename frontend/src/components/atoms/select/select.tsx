import React, { forwardRef, ComponentProps, HTMLProps } from 'react'

import styles from './select.module.css'

export const Select = forwardRef<
  HTMLSelectElement,
  HTMLProps<HTMLSelectElement>
>(({ children, className = styles.select, ...rest }, ref) => {
  return (
    <select ref={ref} className={className} {...rest}>
      {children}
    </select>
  )
})
