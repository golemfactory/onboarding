import { StepType } from 'state/steps'
import { BalanceCaseType } from './path'
import { TokenCategory } from './ethereum'
import { OnboardingStageType } from 'state/stages'

export interface WalletState {
  accounts: any[]
  balance: Record<TokenCategory, bigint>
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
  address?: string | null
  balanceCase?: BalanceCaseType
  metaMask: MetaMaskContextData
  glmAdded: boolean
  skipSteps?: StepType[]
  stage: OnboardingStageType
  initialStep: string
}
