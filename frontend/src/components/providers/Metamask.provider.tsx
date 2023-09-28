/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useState,
  useEffect,
  createContext,
  PropsWithChildren,
  useContext,
  useCallback,
} from 'react'

import detectEthereumProvider from '@metamask/detect-provider'
import { MetaMaskContextData, WalletState } from 'types/dataContext'
import { getBalances } from 'utils/getBalances'
import { TokenCategory } from 'types/ethereum'

const disconnectedState: WalletState = {
  accounts: [],
  balance: {
    [TokenCategory.GLM]: BigInt(0),
    [TokenCategory.NATIVE]: BigInt(0),
  },
  chainId: '',
} as WalletState

export const MetaMaskContext = createContext<MetaMaskContextData>(
  {} as MetaMaskContextData
)

export const MetaMaskProvider = ({ children }: PropsWithChildren) => {
  const [hasProvider, setHasProvider] = useState<boolean | null>(null)

  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const clearError = () => setErrorMessage('')

  const [wallet, setWallet] = useState(disconnectedState)
  // useCallback ensures that you don't uselessly recreate the _updateWallet function on every render
  const _updateWallet = useCallback(async (providedAccounts?: any) => {
    const accounts =
      providedAccounts ||
      (await window.ethereum.request({ method: 'eth_accounts' }))

    if (accounts.length === 0) {
      // If there are no accounts, then the user is disconnected
      setWallet(disconnectedState)
      return
    }

    const balance = await getBalances()

    const chainId = await window.ethereum.request({
      method: 'eth_chainId',
    })

    setWallet({ accounts, balance, chainId })
  }, [])

  const updateWalletAndAccounts = useCallback(
    () => _updateWallet(),
    [_updateWallet]
  )
  const updateWallet = useCallback(
    (accounts: any) => _updateWallet(accounts),
    [_updateWallet]
  )

  /**
   * This logic checks if MetaMask is installed. If it is, some event handlers are set up
   * to update the wallet state when MetaMask changes. The function returned by useEffect
   * is used as a "cleanup": it removes the event handlers whenever the MetaMaskProvider
   * is unmounted.
   */
  useEffect(() => {
    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true })
      setHasProvider(Boolean(provider))

      if (provider) {
        updateWalletAndAccounts()
        window.ethereum.on('accountsChanged', updateWallet)
        window.ethereum.on('chainChanged', updateWalletAndAccounts)
      }
    }

    getProvider()

    return () => {
      window.ethereum?.removeListener('accountsChanged', updateWallet)
      window.ethereum?.removeListener('chainChanged', updateWalletAndAccounts)
    }
  }, [updateWallet, updateWalletAndAccounts])

  const connect = async () => {
    setIsConnecting(true)

    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })
      clearError()
      updateWallet(accounts)
    } catch (err: any) {
      setErrorMessage(err.message)
    }
    setIsConnecting(false)
    setIsConnected(true)
  }

  return (
    <MetaMaskContext.Provider
      value={{
        wallet,
        hasProvider,
        error: !!errorMessage,
        errorMessage,
        isConnecting,
        isConnected,
        connect,
        clearError,
      }}
    >
      {children}
    </MetaMaskContext.Provider>
  )
}

export const useMetaMask = () => {
  const context = useContext(MetaMaskContext)
  if (context === undefined) {
    throw new Error(
      'useMetaMask must be used within a "MetaMaskContextProvider"'
    )
  }
  return context
}
