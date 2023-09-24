import { FC, createContext, useContext, useMemo } from 'react'
import { StepType } from 'state/steps'
import { BalanceCaseType } from 'types/path'

function useQuery() {
  const search = window.location.search

  return useMemo(() => new URLSearchParams(search), [search])
}

type SetupContextData = {
  address: string | null
  balanceCase?: BalanceCaseType
  skipSteps?: StepType[]
}

const SetupContext = createContext<SetupContextData>({
  address: '',
})

export const SetupProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const query = useQuery()

  const address = query.get('address')
  const balanceCase = query.get('balance-case')
  //TODO add assert
  const skipSteps = query.getAll('skip-steps') as StepType[]
  console.log('skip', skipSteps)
  return (
    <SetupContext.Provider
      value={{
        address: address,
        balanceCase: balanceCase as BalanceCaseType,
        skipSteps: skipSteps,
      }}
    >
      {children}
    </SetupContext.Provider>
  )
}

export const useSetup = () => {
  const context = useContext(SetupContext)
  return context
}
