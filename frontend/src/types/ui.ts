import { ComponentType, PropsWithChildren, ReactElement } from 'react'

export type StepRenderDetailsType = {
  name: string
  main: ComponentType<{
    setIsCompleted?: (isCompleted: boolean) => void
    isNextCalled?: boolean
    goToNextStep?: () => void
    setPlacement?: (placement: 'inside' | 'outside') => void
    placement?: 'inside' | 'outside'
  }>
  title?: ComponentType<Record<string, never>>
  subtitle?: ComponentType<Record<string, never>>
  ornament?: ComponentType<Record<string, never>>
  placement: 'inside' | 'outside'
  showNextButton?: boolean
  checkCompleted?: () => boolean
  layout: ComponentType<PropsWithChildren<unknown>>
}

export type MainLayoutPropsType = PropsWithChildren<{
  header?: ReactElement
  footer?: ReactElement
}>

export type StepWithProgressPropsType = PropsWithChildren<unknown>
