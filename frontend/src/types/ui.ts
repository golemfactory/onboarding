import { ComponentType, ReactNode } from 'react'

export type StepLayoutPropsType = {
  name: string
  Component: ComponentType<unknown>
  TitleComponent: ComponentType<unknown>
}

export type MainLayoutPropsType = {
  header?: ReactNode
  footer?: ReactNode
  main?: ReactNode
}
