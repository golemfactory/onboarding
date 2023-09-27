export const providerState = {
  NO_PROVIDER: 'no-provider',
  NOT_METAMASK: 'not-metamask',
  NOT_CONNECTED: 'not-connected',
  METAMASK: 'metamask',
}

export const verifyMetamask = () => {
  const provider = window.ethereum

  if (!provider) {
    return providerState.NO_PROVIDER
  }

  if (!provider.isMetaMask) {
    return providerState.NOT_METAMASK
  }

  if (!provider.selectedAddress) {
    return providerState.NOT_CONNECTED
  }

  return providerState.METAMASK
}

export const ensureMetamaskConnection = async () => {
  return verifyMetamask()
}
