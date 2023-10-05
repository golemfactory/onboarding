import {
  FC,
  PropsWithChildren,
  ReactNode,
  createContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useInterpret } from '@xstate/react'
import { createStateMachineWithContext } from 'state/machine'
import { LoadingSpinner } from 'components/atoms/loadingSpinner'
import { useMetaMask } from './Metamask.provider'
import { Step, StepType } from 'state/steps'
import { useSetup } from './Setup.provider'
import { OnboardingStage } from 'state/stages'

export const OnboardingContext = createContext<{
  service: any
}>({
  service: {} as any,
})

export const AwaitForMetamaskSDK: FC<{ children: ReactNode }> = ({
  children,
}) => {
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

export const OnboardingProvider = ({ children }: PropsWithChildren) => {
  //TODO : make own hook for this to avoid calling get for every param

  const setup = useSetup()
  const metaMask = useMetaMask()

  const [initialStep] = useState<StepType>(
    localStorage.getItem('OnboardingStep') as StepType
  )

  const ref = useRef(
    createStateMachineWithContext({
      ...setup,
      metaMask,
      glmAdded: false,
      stage:
        initialStep === Step.CONNECT_WALLET
          ? OnboardingStage.WALLET
          : OnboardingStage.WELCOME,
      initialStep,
    })
  )

  useEffect(() => {
    localStorage.setItem('OnboardingStep', '')
  }, [initialStep])

  const service = useInterpret(ref.current)

  return (
    <OnboardingContext.Provider value={{ service }}>
      {children}
    </OnboardingContext.Provider>
  )
}
