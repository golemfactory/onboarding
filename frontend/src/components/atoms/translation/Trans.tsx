import { Trans as TransComponent } from 'react-i18next'
import { ComponentProps, PropsWithChildren } from 'react'
import { GolemSmallIcon, MaticIcon, RampIcon } from '../icons'
import { UniswapIcon } from '../icons/uniswap.icon'

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
        a: <a></a>,
        b: <b></b>,
        red: <div className="inline text-dangerred-200" />,
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
        maticIcon: <MaticIcon className="inline h-line-1 mr-0.5 ml-1.5" />,
        UniswapIcon: <UniswapIcon className="inline" />,
        RampIcon: <RampIcon className="inline" />,
        ...props.components,
        Heart: <img src="heart.svg" className="inline h-line-1.5" />,
      }}
    />
  )
}
