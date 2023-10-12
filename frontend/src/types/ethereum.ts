export const UtilityToken = {
  GLM_POLYGON: 'GLM_POLYGON',
  GLM_MUMBAI: 'GLM_MUMBAI',
  GLM_MAINNET: 'GLM_MAINNET',
} as const

export type UtilityTokenType = (typeof UtilityToken)[keyof typeof UtilityToken]

export const NativeToken = {
  MATIC_POLYGON: 'MATIC_POLYGON',
  MATIC_MUMBAI: 'MATIC_MUMBAI',
  ETH_MAINNET: 'ETH_MAINNET',
} as const

export type NativeTokenType = (typeof NativeToken)[keyof typeof NativeToken]

export const WrappedToken = {
  WMATIC_POLYGON: 'WMATIC_POLYGON',
  WMATIC_MUMBAI: 'WMATIC_MUMBAI',
} as const

export type WrappedTokenType = (typeof WrappedToken)[keyof typeof WrappedToken]

export const Token = {
  ...UtilityToken,
  ...NativeToken,
  ...WrappedToken,
} as const

export type TokenType = UtilityTokenType | NativeTokenType | WrappedTokenType

export enum TokenCategory {
  //represents set of all ERC20 tokens deployed by Golem
  //to be used as utility token
  GLM = 'GLM',
  //represents set of all native tokens
  NATIVE = 'NATIVE',
}

export const Network = {
  POLYGON: '0x89',
  MUMBAI: '0x13881',
  MAINNET: '0x1',
} as const

export type NetworkType = (typeof Network)[keyof typeof Network]

export interface IToken {
  name: string
  decimals: number
  isNative: boolean
  symbol: TokenType
  network: NetworkType
}

export interface INativeToken extends IToken {
  isNative: true
  symbol: NativeTokenType
}

export type EthereumAddress = `0x${string}` & { __brand: 'EthereumAddress' }

export interface IUtilityToken extends IToken {
  isNative: false
  symbol: UtilityTokenType
  address: EthereumAddress
}

export interface IWrappedToken extends IToken {
  isNative: false
  symbol: WrappedTokenType
  address: EthereumAddress
}

export interface INetwork {
  chainId: NetworkType
  chainName: string
  rpcUrls: string[]
  blockExplorerUrls: string[]
  nativeCurrency: INativeToken
}

export function assertEthereumAddress(
  x: unknown
): asserts x is EthereumAddress {
  const regex = /^(0x)?[0-9a-fA-F]{40}$/

  if (!regex.test(String(x))) {
    throw new Error(`Invalid ethereum account ${x}`)
  }
}

export function assertSupportedChainId(x: string): asserts x is NetworkType {
  if (!Object.values(Network as Record<string, string>).includes(x)) {
    throw new Error('Invalid Ethereum chain ID')
  }
}

export type IContracts = {
  uniswapV2: {
    address: EthereumAddress
  }
  GLM: {
    address: EthereumAddress
  }
  //I intentionally do not use ETH to describe native token to avoid confusion
  wrappedNativeToken?: {
    address: EthereumAddress
  }
  swapPath: EthereumAddress[]
}

export enum TxStatus {
  READY = 'READY',
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}
