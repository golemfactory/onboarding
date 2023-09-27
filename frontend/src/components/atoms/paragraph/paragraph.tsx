import { forwardRef, ComponentProps } from 'react'

import styles from './paragraph.module.css'

export const Paragraph = forwardRef<HTMLParagraphElement, ComponentProps<'p'>>(
  function Paragraph({ children, className, ...rest }, ref) {
    const combinedClassName = ` ${className || ''} ${styles.paragraph}`.trim()

    return (
      <div ref={ref} className={combinedClassName} {...rest}>
        {children}
      </div>
    )
  }
)
