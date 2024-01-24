import { ComponentProps } from 'react'

export const EthereumIcon = (props: ComponentProps<'svg'>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="23"
      viewBox="0 0 16 23"
      fill="none"
      {...props}
    >
      <path
        d="M7.99517 0L7.84082 0.52414V15.7321L7.99517 15.8861L15.0562 11.7133L7.99517 0Z"
        fill="#CBCBCC"
      />
      <path
        d="M7.99534 0L0.934082 11.7133L7.99534 15.8861V8.50454V0Z"
        fill="#CBCBCC"
      />
      <path
        d="M8.00032 17.2234L7.91333 17.3294V22.7467L8.00032 23.0006L15.0657 13.0527L8.00032 17.2234Z"
        fill="#7A7A7A"
      />
      <path
        d="M7.99534 23.0006V17.2234L0.934082 13.0527L7.99534 23.0006Z"
        fill="#CBCBCC"
      />
      <path
        d="M7.99951 15.8854L15.0606 11.7127L7.99951 8.50391V15.8854Z"
        fill="#7A7A7A"
      />
      <path
        d="M0.934082 11.7127L7.99534 15.8854V8.50391L0.934082 11.7127Z"
        fill="#A9A9A9"
      />
    </svg>
  )
}
