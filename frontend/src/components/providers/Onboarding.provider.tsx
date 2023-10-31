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
import { useBalance } from 'hooks/useBalance'
import { useUpdateQueryStringValueWithoutReload } from 'hooks/useUpdateQueryStringWithoutReload'

export const OnboardingContext = createContext<{
  service: unknown
}>({
  service: {} as unknown,
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

  //cleanup local storage

  const [initialStep] = useState<StepType>(
    localStorage.getItem('OnboardingStep') as StepType
  )

  useEffect(() => {
    localStorage.setItem('OnboardingStep', '')
  }, [initialStep])

  const { chain } = useNetwork()
  const { address } = useAccount()
  const balance = useBalance()
  const ref = useRef(
    createStateMachineWithContext({
      ...setup,
      glmAdded: false,
      stage:
        initialStep === Step.CONNECT_WALLET
          ? OnboardingStage.WALLET
          : OnboardingStage.WELCOME,
      blockchain: {
        chainId: chain?.id,
        address,
        balance,
      },
    })
  )

  const [step, setStep] = useState<string>(Step.WELCOME)

  const service = useInterpret(ref.current, {}, (state) => {
    setStep(String(state.value))
  })

  useUpdateQueryStringValueWithoutReload('step', step)

  //update state machine context so we are sure we keep machine in sync with the blockchain context
  useEffect(() => {
    service.send({
      type: Commands.CHAIN_CONTEXT_CHANGED,
      payload: chain
        ? { chainId: chain.id, address, balance }
        : { address, balance },
    })
  }, [chain, service, balance])

  return (
    <OnboardingContext.Provider value={{ service }}>
      {children}
    </OnboardingContext.Provider>
  )
}
