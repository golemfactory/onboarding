import styles from './slider.module.css'

export const Slider = ({
  min,
  max,
  step = 1,
  value,
  label = '',
  InputClassName,
  LabelClassName,
  ...rest
}: {
  min: number
  max: number
  step?: number
  value: number
  label?: string
  InputClassName?: string
  LabelClassName: string
}) => {
  const combinedInputClassName = ` ${InputClassName || ''} ${
    styles.input
  }`.trim()

  const combinedLabelClassName = ` ${styles.label}  ${
    LabelClassName || ''
  }`.trim()

  // <label for="default-range" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Default range</label>

  return (
    <div>
      <label className={combinedLabelClassName}>{label}</label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        className={combinedInputClassName}
        value={value}
        {...rest}
      />
      <p className="text-center mt-2">Value: {value}</p>
    </div>
  )
}
