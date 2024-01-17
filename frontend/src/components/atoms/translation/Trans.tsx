import { Trans as TransComponent } from 'react-i18next'
import { ComponentProps, PropsWithChildren } from 'react'
import { GolemIcon, GolemSmallIcon, MaticIcon } from '../icons'

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
console.log('trans component')

export const Trans = (props: ComponentProps<typeof TransComponent>) => {
  return (
    <TransComponent
      {...props}
      components={{
        breakLine: <br />,
        golemIcon: (
          <GolemSmallIcon className="inline h-line-1.5 mr-0.5 ml-0.5" />
        ),
        tab: <span className="ml-4" />,
        emptyLine: (
          <>
            <br />
            <br />
          </>
        ),
        maticIcon: <MaticIcon className="inline h-line-1.5 mr-0.5 ml-0.5" />,
        ...props.components,
      }}
    />
  )
}
