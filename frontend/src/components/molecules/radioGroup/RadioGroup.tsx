import { ChangeEvent, ReactElement } from 'react'
import style from './RadioGroup.module.css'
import { motion } from 'framer-motion'

type RadioItem<T> = {
  id: T
  label: ReactElement
  checked: boolean
}

type RadioGroupProps<T> = {
  className: string
  items: RadioItem<T>[]
  onSelect: ({
    itemId,
    event,
  }: {
    itemId: T
    event: ChangeEvent<HTMLInputElement>
  }) => void
}

export const RadioGroup = <T,>({
  className,
  items,
  onSelect,
}: RadioGroupProps<T>) => {
  return (
    <fieldset className={className}>
      {items.map((item, idx) => {
        return (
          <div key={idx}>
            <motion.div
              key={`item_${item.id}`}
              className="flex items-center mt-4"
            >
              <input
                id={`item_${item.id}`}
                name="notification-method"
                type="radio"
                defaultChecked={item.checked}
                className={`${style.radio}`}
                onChange={(event) => onSelect({ itemId: item.id, event })}
              />
              <label
                htmlFor={`item_${item.id}`}
                className="ml-3 block text-sm font-medium leading-6 text-gray-900"
              >
                {item.label}
              </label>
            </motion.div>
          </div>
        )
      })}
    </fieldset>
  )
}
