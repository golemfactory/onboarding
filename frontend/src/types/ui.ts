import { ComponentType, ReactElement, ReactNode } from 'react'

export type StepRenderDetailsType = {
  name: string
  main: ComponentType<{
    setIsCompleted: (isCompleted: boolean) => void
    isNextCalled: boolean
    goToNextStep: () => void
  }>
  title?: ComponentType<Record<string, never>>
  subtitle?: ComponentType<Record<string, never>>
  ornament?: ComponentType<Record<string, never>>
  placement: 'inside' | 'outside'
  showNextButton?: boolean
  checkCompleted?: () => boolean
}

export type MainLayoutPropsType = {
  header?: ReactElement
  footer?: ReactElement
  main: ReactElement
}

export type StepWithProgressPropsType = {
  content: ReactElement
}
