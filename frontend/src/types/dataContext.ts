import { StepType } from 'state/steps'
import { BalanceCaseType } from './path'
import { EthereumAddress, NetworkType, TokenCategory } from './ethereum'
import { OnboardingStageType } from 'state/stages'

export interface WalletState {
  accounts: any[]
  balance: Record<TokenCategory, bigint>
  chainId: string
}

export type BlockchainContextData = {
  chainId?: NetworkType
  address?: EthereumAddress
}

export interface BlockchainContextDataInterface extends BlockchainContextData {
  isConnected: boolean
}

export type OnboardingContextData = {
  address?: string | null
  balanceCase?: BalanceCaseType
  glmAdded: boolean
  skipSteps?: StepType[]
  stage: OnboardingStageType
  initialStep: string
  blockchain: BlockchainContextData
}

export interface OnboardingContextDataInterface extends OnboardingContextData {
  blockchain: BlockchainContextDataInterface
}
