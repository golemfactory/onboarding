import { ComponentType, ReactElement, ReactNode } from 'react'

export type StepLayoutPropsType = {
  name: string
  Component: ComponentType<{
    setIsCompleted: (isCompleted: boolean) => void
    isNextCalled: boolean
  }>
  TitleComponent: ComponentType<unknown>
}

export type MainLayoutPropsType = {
  header?: ReactElement
  footer?: ReactElement
  main: ReactElement
  background: ReactNode
}
