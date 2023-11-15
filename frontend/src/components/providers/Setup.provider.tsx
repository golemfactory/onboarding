import { PropsWithChildren, createContext, useContext } from 'react'

import { SetupContextData, assertProperSetup } from 'types/setup'
import { useSearchParams } from 'react-router-dom'

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
