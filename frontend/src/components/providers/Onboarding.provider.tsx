import { FC, ReactNode, createContext, useEffect, useState } from 'react'
import { useInterpret } from '@xstate/react'
import { InterpreterFrom } from 'xstate'
import { createStateMachineWithContext } from 'state/machine'
import { LoadingSpinner } from 'components/atoms/loadingSpinner'
import { useMetaMask } from './MetamaskProvider'
import { StepType, Step } from 'state/steps'
import { useSetup } from './Setup.provider'

//TODO : provide better typing

export const OnboardingContext = createContext<{
  service: InterpreterFrom<any>
}>({
  //a little hack to make TS happy
  service: {} as InterpreterFrom<any>,
})

export const AwaitForMetamaskSDK: FC<{ children: ReactNode }> = ({ children }) => {
  const [showLoading, setShowLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setShowLoading(false)
    }, 2000)
  }, [])

  if (!showLoading) {
    return <>{children}</>
  } else {
    return <LoadingSpinner />
  }
}

export const OnboardingProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  //TODO : make own hook for this to avoid calling get for every param
  const setup = useSetup()
  const metaMask = useMetaMask()
  const [initialStep, setInitialStep] = useState<StepType>(localStorage.getItem('OnboardingStep') as StepType)

  useEffect(() => {
    localStorage.setItem('OnboardingStep', '')
  }, [initialStep])

  const service = useInterpret(
    createStateMachineWithContext(
      {
        ...setup,
        metaMask,
        glmAdded: false,
      },
      initialStep
    )
  )

  return (
    //@ts-ignore
    <OnboardingContext.Provider value={{ service }}>{children}</OnboardingContext.Provider>
  )
}
