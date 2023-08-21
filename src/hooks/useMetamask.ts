import { MetaMaskContext } from 'components/providers'
import { useContext } from 'react'

export const useMetaMask = () => {
  const context = useContext(MetaMaskContext)
  if (context === undefined) {
    throw new Error(
      'useMetaMask must be used within a "MetaMaskContextProvider"'
    )
  }
  return context
}
