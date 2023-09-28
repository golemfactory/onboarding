import { PropsWithChildren, createContext, useContext, useMemo } from 'react'
import { StepType } from 'state/steps'
import { EthereumAddress } from 'types/ethereum'
import { BalanceCaseType } from 'types/path'
import { assertProperSetup } from 'types/setup'

function useQuery() {
  const search = window.location.search

  return useMemo(() => new URLSearchParams(search), [search])
}

type SetupContextData = {
  yagnaAddress?: EthereumAddress
  balanceCase?: BalanceCaseType
  skipSteps?: StepType[]
}

const SetupContext = createContext<SetupContextData>({})

const useSetupParams = () => {
  const query = useQuery()

  const setup = {
    yagnaAddress: query.get('yagna-address'),
    balanceCase: query.get('balance-case'),
    skipSteps: query.getAll('skip-steps'),
  }
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
