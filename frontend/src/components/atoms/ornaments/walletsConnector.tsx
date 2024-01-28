import { ArrowRightIcon } from '@heroicons/react/24/solid'
import { motion } from 'framer-motion'
import { ComponentProps, ComponentType } from 'react'

const Circle = ({
  size,
  icon,
  ...rest
}: {
  size: number
  icon?: {
    Component: ComponentType<ComponentProps<'svg'>>
    size: number
    className: string
  }
} & ComponentProps<'svg'>) => {
  return (
    <svg
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <circle cx={size / 2} cy={size / 2} r={size / 2 - 2}></circle>

      {icon && (
        <motion.svg
          width={icon.size}
          height={icon.size}
          x={size / 2 - icon.size / 2}
          y={size / 2 - icon.size / 2}
          className={`stroke-2 ${icon.className}`}
          animate={{ scale: [1, 3] }} // Define the animation
          transition={{
            repeat: Infinity, // Define the transition
            repeatType: 'reverse',
            duration: 0.5,
          }}
        >
          <icon.Component />
        </motion.svg>
      )}
    </svg>
  )
}

export const WalletsConnector = () => {
  return (
    <div className="flex gap-1 items-center">
      <Circle size={15} className="stroke-lightblue-200 fill-lightblue-50" />
      <Circle size={8} className="stroke-lightblue-200 fill-lightblue-200" />
      <Circle
        size={8}
        className="stroke-lightblue-200 fill-primary fill-[#181ea9cc]
"
      />
      <Circle
        size={24}
        className="stroke-lightblue-200 fill-lightblue-50"
        icon={{
          Component: ArrowRightIcon,
          size: 10,
          className: 'stroke-primary',
        }}
      />
      <Circle size={8} className="stroke-lightblue-200 fill-lightblue-200" />
      <Circle size={8} className="stroke-lightblue-200 fill-[#181ea9cc]" />
      <Circle size={15} className="stroke-lightblue-200 fill-lightblue-50" />
    </div>
  )
}
