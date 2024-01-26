export const WalletProvider = {
  METAMASK: 'metamask',
  TRUST_WALLET: 'trustwallet',
} as const

export type WalletProviderType =
  (typeof WalletProvider)[keyof typeof WalletProvider]

export const useWallet = (): WalletProviderType => {
  //TODO improve this to allow detection of wallet connect
  //for now we support only metamask or trust wallet
  // so we rely on window.ethereum.isMetaMask

  const isMetaMask = window.ethereum.isMetaMask
  if (isMetaMask) {
    return WalletProvider.METAMASK
  }
  return WalletProvider.TRUST_WALLET
}
