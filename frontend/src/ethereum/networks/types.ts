import { Token } from 'ethereum/tokens'
import { INetwork } from 'src/types/ethereum'

export enum Network {
  POLYGON = '0x89',
  MUMBAI = '0x13881',
  ETHEREUM = '0x1',
}

export interface ISupportedNetwork extends INetwork {
  chainId: Network // Override chainId with Network enum type
  nativeCurrency: {
    name: string
    symbol: Token
    decimals: number
  }
}
