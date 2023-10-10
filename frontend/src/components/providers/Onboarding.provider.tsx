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
import { Step, StepType } from 'state/steps'
import { useSetup } from './Setup.provider'
import { OnboardingStage } from 'state/stages'
import { useNetwork } from 'hooks/useNetwork'
import { Commands } from 'state/commands'
import { useAccount } from 'hooks/useAccount'

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

  const [initialStep] = useState<StepType>(
    localStorage.getItem('OnboardingStep') as StepType
  )

  const { chain } = useNetwork()
  const { address } = useAccount()

  console.log('c', chain)
  const ref = useRef(
    createStateMachineWithContext({
      ...setup,
      glmAdded: false,
      stage:
        initialStep === Step.CONNECT_WALLET
          ? OnboardingStage.WALLET
          : OnboardingStage.WELCOME,
      initialStep,
      blockchain: {},
    })
  )

  useEffect(() => {
    localStorage.setItem('OnboardingStep', '')
  }, [initialStep])

  const service = useInterpret(ref.current)

  useEffect(() => {
    console.log('sending')
    console.log('with chain', chain)
    service.send({
      type: Commands.CHAIN_CONTEXT_CHANGED,
      payload: chain ? { chainId: chain.id, address } : { address },
    })
  }, [chain, service])

  return (
    <OnboardingContext.Provider value={{ service }}>
      {children}
    </OnboardingContext.Provider>
  )
}
