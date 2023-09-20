import MetaMaskSDK, { SDKProvider } from '@metamask/sdk'
import { MetaMaskContextData } from 'types/dataContext'
export const providerState = {
  NO_PROVIDER: 'no-provider',
  NOT_METAMASK: 'not-metamask',
  NOT_CONNECTED: 'not-connected',
  METAMASK: 'metamask',
}

export const verifyMetamask = ({ metaMask }: { metaMask: MetaMaskContextData }) => {
  console.log('fdsfsdf')
  const provider = window.ethereum
  if (!provider) {
    return providerState.NO_PROVIDER
  }

  if (!provider.isMetaMask) {
    return providerState.NOT_METAMASK
  }

  console.log(',mme', metaMask.wallet)
  if (!metaMask.wallet.accounts.length) {
    return providerState.NOT_CONNECTED
  }

  return providerState.METAMASK
}

export const ensureMetamaskConnection = async (context: any) => {
  return verifyMetamask({ metaMask: context.metaMask })
}
