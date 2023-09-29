import { ReactNode } from 'react'

export type StepPropsType = {
  onConfirm: () => void
  title: string
  content: ReactNode | string
  buttonText: string
}

export type LayoutPropsType = {
  header: ReactNode
  footer: ReactNode
  main: ReactNode
}
