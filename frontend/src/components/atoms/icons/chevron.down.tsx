import { ComponentProps } from 'react'

export const ChevronDownIcon = (props: ComponentProps<'svg'>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        d="M19 9L12 16L5 9"
        stroke="#0E137C"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
