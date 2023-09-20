import MetaMaskSDK, { SDKProvider } from '@metamask/sdk'

export const providerState = {
  NO_PROVIDER: 'no-provider',
  NOT_METAMASK: 'not-metamask',
  NOT_CONNECTED: 'not-connected',
  METAMASK: 'metamask',
}

export const verifyMetamask = (provider: SDKProvider | undefined) => {
  if (!provider) {
    return providerState.NO_PROVIDER
  }

  if (!provider.isConnected()) {
    return providerState.NOT_CONNECTED
  }

  if (provider != window.ethereum) {
    return providerState.NOT_METAMASK
  }
  return providerState.METAMASK
}

export const ensureMetamaskConnection = async (context: any) => {
  return verifyMetamask(context.sdk ? context.sdk.getProvider() : undefined)
}
