import { PropsWithChildren, createContext, useContext } from 'react'

import { SetupContextData, assertProperSetup } from 'types/setup'
import { useSearchParams } from 'react-router-dom'
import { networkToHex } from 'utils/networkToHex'

export const SetupContext = createContext<SetupContextData>({})

const parseSetupParams = (
  params: Record<string, string>
): Record<string, string> => {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (key === 'network') {
        return [key, networkToHex(value)]
      }
      return [key, value]
    })
  )
}

const useSetupParams = () => {
  const [searchParams] = useSearchParams()
  const setup = parseSetupParams(Object.fromEntries(searchParams))
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
