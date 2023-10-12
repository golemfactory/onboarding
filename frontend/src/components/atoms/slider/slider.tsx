import styles from './slider.module.css'
import './slider.css'

export type ISliderProps = {
  min: number | string
  max: number | string
  step?: number
  value: number
  label?: string
  displayValue?: (v: number) => string
}
export const Slider = ({
  min,
  max,
  step = 1,
  value,
  label = '',
  displayValue = (v: number) => (v ? v.toString() : ''),
  ...rest
}: ISliderProps) => {
  // <label for="default-range" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Default range</label>

  return (
    <div>
      <label className={styles.label}>{label}</label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        className="slider"
        value={value}
        {...rest}
      />
      <div className="text-center mt-2">
        {displayValue ? displayValue(value) : value}
      </div>
    </div>
  )
}
