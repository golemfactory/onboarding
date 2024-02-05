import { BalanceCaseType } from './path'
import { EthereumAddress, NetworkType, TokenCategory } from './ethereum'
import { OnboardingStage } from '../state/stages'
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

export type BlockchainContextInterface = {
  isConnected(): boolean
}

export const BudgetOption = {
  PLAY_AROUND: 'playAround',
  COMPUTE: 'compute',
  AMBITIOUS: 'ambitious',
  CUSTOM: 'custom',
} as const

export type BudgetType = (typeof BudgetOption)[keyof typeof BudgetOption]

export function assertBudgetType(
  value: string | null
): asserts value is BudgetType {
  if (!Object.values(BudgetOption).includes(value as BudgetType)) {
    console.log('Invalid Budget Type', value)
    throw new Error('Invalid Budget Type')
  }
}

export interface OnboardingContextData {
  blockchain: BlockchainContextInterface & BlockchainContextData
  budget: BudgetType
  yagnaAddress?: string
  address?: string
  balanceCase?: BalanceCaseType
  stage: (typeof OnboardingStage)[keyof typeof OnboardingStage]
  boughtNative: number
  boughtGLM: number
}
