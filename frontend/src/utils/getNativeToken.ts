import { NativeTokenType, Network, NetworkType, Token } from 'types/ethereum'

export const getNativeToken = (chainId: NetworkType): NativeTokenType => {
  switch (chainId) {
    case Network.POLYGON:
      return Token.POL_POLYGON
    case Network.MUMBAI:
      return Token.POL_MUMBAI
    case Network.MAINNET:
      return Token.ETH_MAINNET
  }
}

export const getTokenName = (token: NativeTokenType) => {
  return {
    [Token.POL_POLYGON]: 'POL',
    [Token.POL_MUMBAI]: 'POL',
    [Token.ETH_MAINNET]: 'ETH',
  }[token]
}
