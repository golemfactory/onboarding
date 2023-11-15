import React, { ReactNode } from 'react'

export type StepPropsType = {
  onConfirm: () => void
  title: string
  content: ReactNode | string
  buttonText: unknown
}

export type LayoutPropsType = {
  header: ReactNode
  footer: ReactNode
  main: ReactNode
}
