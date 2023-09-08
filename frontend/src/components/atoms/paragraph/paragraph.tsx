import { forwardRef, ComponentProps } from 'react'

import styles from './paragraph.module.css'

const Paragraph = forwardRef<HTMLParagraphElement, ComponentProps<'p'>>(
  ({ children, className = styles.paragraph, ...rest }, ref) => {
    return (
      <p ref={ref} className={className} {...rest}>
        {children}
      </p>
    )
  }
)

export { Paragraph }
