import { FC, createContext } from 'react'
import { useSearchParams } from 'react-router-dom'

type SetupContextData = {
  address: ''
}

const SetupContext = createContext<SetupContextData>({
  address: '',
})

export const SetupProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchParams] = useSearchParams()

  return <SetupContext.Provider value={{ address: '' }}>{children}</SetupContext.Provider>
}
