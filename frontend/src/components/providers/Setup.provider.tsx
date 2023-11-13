import { PropsWithChildren, createContext, useContext } from 'react'
import { StepType } from 'state/steps'
import { EthereumAddress } from 'types/ethereum'
import { BalanceCaseType } from 'types/path'
import { assertProperSetup } from 'types/setup'

import { useSearchParams } from 'react-router-dom'

type SetupContextData = {
  yagnaAddress?: EthereumAddress
  balanceCase?: BalanceCaseType
  skipSteps?: StepType[]
}

export const SetupContext = createContext<SetupContextData>({})

const useSetupParams = () => {
  const [searchParams] = useSearchParams()
  const setup = Object.fromEntries(searchParams)
  assertProperSetup(setup)
  return setup
}

export const SetupProvider = ({ children }: PropsWithChildren) => {
  return (
    <SetupContext.Provider value={useSetupParams()}>
      {children}
    </SetupContext.Provider>
  )
}

export const useSetup = () => {
  const context = useContext(SetupContext)
  return context
}
