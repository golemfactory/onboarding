import { StepType } from 'state/steps'
import { BalanceCaseType } from './path'
import { EthereumAddress, NetworkType, TokenCategory } from './ethereum'
import { OnboardingStageType } from 'state/stages'
import { Commands } from 'state/commands'

export interface WalletState {
  accounts: any[]
  balance: Record<TokenCategory, bigint>
  chainId: string
}

export type BlockchainContextData = {
  chainId?: NetworkType
  address?: EthereumAddress
}

export type OnboardingContextDataType = {
  address?: string | null
  balanceCase?: BalanceCaseType
  skipSteps?: StepType[]
  stage: OnboardingStageType
  initialStep: string
  blockchain: BlockchainContextData & {
    isConnected: () => boolean
  }
}

export type OnboardingEventsType =
  | { type: 'ADD_GLM' }
  | { type: Commands.NEXT }
  | { type: Commands.PREVIOUS }

  //this event is used to communicate from blockchain related hooks
  //that transfer changes here so machine can keep needed data in context
  //this is far from ideal as it create two sources of truth
  //but wagmi do not provide any other way to do this
  | {
      type: Commands.CHAIN_CONTEXT_CHANGED
      payload: BlockchainContextData
    }
