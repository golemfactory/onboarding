import { Trans as TransComponent } from 'react-i18next'
import { ComponentProps } from 'react'
export const Trans = (props: ComponentProps<typeof TransComponent>) => {
  return (
    <TransComponent
      {...props}
      components={{
        breakLine: <br />,
        ...props.components,
      }}
    />
  )
}
