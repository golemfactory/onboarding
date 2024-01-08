import { Trans as TransComponent } from 'react-i18next'
import { ComponentProps, PropsWithChildren } from 'react'

export const LinkText = (
  props: PropsWithChildren<{ to: string; title: string }>
) => {
  return (
    <a
      href={props.to || '#'}
      target="_blank"
      title={props.title || ''}
      rel="noreferrer"
    >
      {props.children}
    </a>
  )
}

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
