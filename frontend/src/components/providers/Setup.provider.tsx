import { Network } from 'ethereum/networks/types'
import { PropsWithChildren, createContext, useContext, useMemo } from 'react'

import { assertProperSetup, SetupContextData } from 'types/setup'

function useQuery() {
  const search = window.location.search

  return useMemo(() => new URLSearchParams(search), [search])
}

function queryToSetup(query: URLSearchParams): SetupContextData {
  console.log('s', query)
  const result = Object.fromEntries(query)
  console.log('re', result)
  result.network =
    Network[query.get('network') as keyof typeof Network] ||
    query.get('network')
  return result
}

export const SetupContext = createContext<SetupContextData>({})

const useSetupParams = () => {
  const query = useQuery()
  const setup = queryToSetup(query)
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
