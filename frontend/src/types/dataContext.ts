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

export type BlockchainContextInterface = {
  isConnected(): boolean
}
// export interface blockchainContextInterface =  BlockchainContextData & {
//   isConnected(): boolean
// }

export const BudgetOption = {
  PLAY_AROUND: { value: 22 },
  COMPUTE: { value: 55 },
  AMBITIOUS: { value: 110 },
  CUSTOM: {},
} as const

export type BudgetType = (typeof BudgetOption)[keyof typeof BudgetOption]

export interface OnboardingContextData {
  blockchain: BlockchainContextInterface & BlockchainContextData
  budget?: BudgetType
  yagnaAddress?: string
  address?: string
  balanceCase?: BalanceCaseType
}
