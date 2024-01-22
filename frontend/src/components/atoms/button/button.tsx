import { forwardRef, ComponentProps } from 'react'

import styles from './button.module.css'

type buttonStyleType = 'solid' | 'outline' | 'underline'

const Button = forwardRef<
  HTMLButtonElement,
  {
    buttonStyle: buttonStyleType
    useDefault?: boolean
  } & ComponentProps<'button'>
>(function Button(
  { children, className = styles.button, buttonStyle, useDefault, ...rest },
  ref
) {
  return (
    <button
      ref={ref}
      className={`${useDefault ? styles.button : ''} ${className} ${
        styles[buttonStyle]
      } `}
      {...rest}
    >
      {children}
    </button>
  )
})

export default Button
