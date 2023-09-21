export interface WalletState {
  accounts: any[]
  balance: string
  chainId: string
}

export interface MetaMaskContextData {
  wallet: WalletState
  hasProvider: boolean | null
  error: boolean
  errorMessage: string
  isConnecting: boolean
  isConnected: boolean
  connect: () => void
  clearError: () => void
}

export type OnboardingContextData = {
  yagnaWalletAddress: string
  metaMask: MetaMaskContextData
  glmAdded: boolean
}
