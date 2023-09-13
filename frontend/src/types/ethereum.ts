interface RequestArguments {
  method: string
  params?: unknown[] | object
}

export interface MetaMaskEthereumProvider {
  isConnected: () => boolean
  isMetaMask: boolean
  request: <T>(args: RequestArguments) => Promise<T>
  once(eventName: string | symbol, listener: (...args: any[]) => void): this
  on(eventName: string | symbol, listener: (...args: any[]) => void): this
  off(eventName: string | symbol, listener: (...args: any[]) => void): this
  addListener(eventName: string | symbol, listener: (...args: any[]) => void): this
  removeListener(eventName: string | symbol, listener: (...args: any[]) => void): this
  removeAllListeners(event?: string | symbol): this
}

export interface IToken {
  name: string
  symbol: string
  decimals: number
}

export interface INetwork {
  chainId: string
  chainName: string
  rpcUrls: string[]
  blockExplorerUrls: string[]
  nativeCurrency: IToken
}

export type EthereumAddress = string & { __brand: 'EthereumAddress' }

export function assertEthereumAddress(x: string): asserts x is EthereumAddress {
  const regex = /^(0x)?[0-9a-fA-F]{40}$/

  if (!regex.test(x)) {
    throw new Error('Invalid ethereum account')
  }
}

export enum Token {
  GLM = 'GLM',
  MATIC = 'MATIC',
  ETH = 'ETH',
}

export interface ISupportedERC20Token extends IToken {
  symbol: Token
  getAddress(network: string): EthereumAddress
  isNative: false
}

export interface ISupportedNativeToken extends IToken {
  symbol: Token
  isNative: true
}

export type ISupportedToken = ISupportedERC20Token | ISupportedNativeToken

export enum Network {
  POLYGON = '0x89',
  MUMBAI = '0x13881',
}

export interface ISupportedNetwork extends INetwork {
  chainId: Network // Override chainId with Network enum type
  nativeCurrency: {
    name: string
    symbol: Token
    decimals: number
  }
}
