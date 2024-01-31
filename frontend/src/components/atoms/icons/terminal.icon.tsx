import { ComponentProps } from 'react'

export const TerminalIcon = (props: ComponentProps<'svg'>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="38"
      height="38"
      viewBox="0 0 38 38"
      fill="none"
      {...props}
    >
      <path
        d="M12.6667 14.2507L17.4167 19.0007L12.6667 23.7507M20.5833 23.7507H25.3333M7.91667 31.6673H30.0833C31.8322 31.6673 33.25 30.2496 33.25 28.5006V9.50065C33.25 7.75175 31.8322 6.33398 30.0833 6.33398H7.91667C6.16777 6.33398 4.75 7.75175 4.75 9.50065V28.5006C4.75 30.2496 6.16776 31.6673 7.91667 31.6673Z"
        stroke="#181EA9"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
