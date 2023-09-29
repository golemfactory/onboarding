import { useContext } from 'react'
import { SetupContext } from 'components/providers'

export const useSetup = () => {
  const context = useContext(SetupContext)
  return context
}
