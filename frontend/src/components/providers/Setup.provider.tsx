import { FC, createContext } from 'react'
import { useSearchParams } from 'react-router-dom'

type SetupContextData = {
  //wallet address,
  address: ''
}

const SetupContext = createContext<SetupContextData>({
  address: '',
})

export const SetupProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [searchParams] = useSearchParams()
  console.log('searchParams', searchParams)

  return (
    <SetupContext.Provider value={{ address: '' }}>
      {children}
    </SetupContext.Provider>
  )
}
