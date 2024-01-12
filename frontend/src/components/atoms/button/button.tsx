import { forwardRef, ComponentProps } from 'react'

import styles from './button.module.css'

type buttonStyleType = 'solid' | 'outline' | 'underline'

const Button = forwardRef<
  HTMLButtonElement,
  { buttonStyle: buttonStyleType; useDefault: true } & ComponentProps<'button'>
>(function Button(
  { children, className = styles.button, buttonStyle, ...rest },
  ref
) {
  return (
    <button
      ref={ref}
      className={`${rest.useDefault ? styles.button : ''} ${className} ${
        styles[buttonStyle]
      } `}
      {...rest}
    >
      {children}
    </button>
  )
})

export default Button
