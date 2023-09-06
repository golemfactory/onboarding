import MetaMaskSDK from '@metamask/sdk'

export type OnboardingContextData = {
  yagnaWalletAddress: string
  sdk?: MetaMaskSDK
}
