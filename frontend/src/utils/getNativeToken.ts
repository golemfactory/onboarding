import { NativeTokenType, Network, NetworkType, Token } from 'types/ethereum'

export const getNativeToken = (chainId: NetworkType): NativeTokenType => {
  switch (chainId) {
    case Network.POLYGON:
      return Token.MATIC_POLYGON
    case Network.MUMBAI:
      return Token.MATIC_MUMBAI
    case Network.MAINNET:
      return Token.ETH_MAINNET
  }
}

export const getTokenName = (token: NativeTokenType) => {
  return {
    [Token.MATIC_POLYGON]: 'Matic',
    [Token.MATIC_MUMBAI]: 'Matic',
    [Token.ETH_MAINNET]: 'Eth',
  }[token]
}
