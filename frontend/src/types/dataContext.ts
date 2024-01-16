import { StepType } from 'state/steps'
import { BalanceCaseType } from './path'
import { EthereumAddress, NetworkType, TokenCategory } from './ethereum'

export interface WalletState {
  accounts: unknown[]
  balance: Record<TokenCategory, bigint>
  chainId: string
}

export type BlockchainContextData = {
  chainId?: NetworkType
  address?: EthereumAddress
  balance: Record<TokenCategory, bigint | undefined>
}

export interface BlockchainContextDataInterface extends BlockchainContextData {
  isConnected: () => boolean
}

export type OnboardingContextData = {
  address?: string | null
  balanceCase?: BalanceCaseType
  blockchain: BlockchainContextData
  step?: StepType
  yagnaAddress?: string
}

export interface OnboardingContextDataInterface extends OnboardingContextData {
  blockchain: BlockchainContextDataInterface
}
