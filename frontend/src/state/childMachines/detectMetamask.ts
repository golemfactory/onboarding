import detectEthereumProvider from '@metamask/detect-provider'
import { MetaMaskEthereumProvider } from 'src/types/ethereum'

export const providerState = {
  NO_PROVIDER: 'no-provider',
  NOT_METAMASK: 'not-metamask',
  METAMASK: 'metamask',
}

export const verifyMetamask = (provider: MetaMaskEthereumProvider | null) => {
  if (!provider) {
    return providerState.NO_PROVIDER
  }
  if (provider !== window.ethereum) {
    return providerState.NOT_METAMASK
  }
  return providerState.METAMASK
}

export const detectMetamask = async () => {
  const provider =
    (await detectEthereumProvider()) as MetaMaskEthereumProvider | null
  return verifyMetamask(provider)
}
