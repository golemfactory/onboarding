import { ComponentType, ReactElement, ReactNode } from 'react'

export type StepLayoutPropsType = {
  name: string
  Component: ComponentType<{
    setIsCompleted: (isCompleted: boolean) => void
    isNextCalled: boolean
  }>
  TitleComponent: ComponentType<unknown>
  placement: 'inside' | 'outside'
}

export type MainLayoutPropsType = {
  header?: ReactElement
  footer?: ReactElement
  main: ReactElement
  background: ReactNode
}
