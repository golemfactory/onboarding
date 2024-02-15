import {
  ComponentProps,
  ElementType,
  forwardRef,
  useEffect,
  useState,
} from 'react'

import style from './checkbox.module.css'
import { v4 as uuidv4 } from 'uuid'

export const Checkbox = forwardRef<
  HTMLInputElement,
  ComponentProps<'input'> & { label: ElementType; error?: boolean }
>(function Checkbox({ label: Label, error, onChange, checked, ...rest }, ref) {
  const [isChecked, setIsChecked] = useState(checked)
  const [inputCssClass, setInputCssClass] = useState('')
  const [id] = useState(uuidv4())
  useEffect(() => {
    if (isChecked) {
      setInputCssClass(style.checked)
    } else {
      if (error) {
        setInputCssClass(style.error)
      } else {
        setInputCssClass(style.unchecked)
      }
    }
  }, [error, isChecked])

  return (
    <div className={style.checkboxWrapper}>
      <input
        id={id}
        ref={ref}
        {...rest}
        type="checkbox"
        onChange={(e) => {
          setIsChecked(e.target.checked)
          onChange?.(e)
        }}
        className={`${style.checkbox} ${inputCssClass}`}
      />
      <Label htmlFor={id} />
    </div>
  )
})
