import { forwardRef, ComponentProps } from 'react'

import styles from './button.module.css'
import { LoadingSpinner } from '../loadingSpinner'

const Button = forwardRef<HTMLButtonElement, ComponentProps<'button'>>(
  ({ children, className = styles.button, ...rest }, ref) => {
    return (
      <button ref={ref} className={className} {...rest}>
        <LoadingSpinner />
      </button>
    )
  }
)

export default Button
