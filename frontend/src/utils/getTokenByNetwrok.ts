import {
  NativeTokenType,
  Network,
  NetworkType,
  Token,
  TokenCategory,
  UtilityTokenType,
} from 'types/ethereum'

export const getTokenByCategory = (
  network: NetworkType,
  tokenCategory: TokenCategory
): UtilityTokenType | NativeTokenType => {
  switch (network) {
    case Network.MUMBAI:
      switch (tokenCategory) {
        case TokenCategory.NATIVE:
          return Token.MATIC_MUMBAI
        case TokenCategory.GLM:
          return Token.GLM_MUMBAI
      }
      break
    case Network.POLYGON:
      switch (tokenCategory) {
        case TokenCategory.NATIVE:
          return Token.MATIC_POLYGON
        case TokenCategory.GLM:
          return Token.GLM_POLYGON
      }
      break
    case Network.MAINNET:
      switch (tokenCategory) {
        case TokenCategory.NATIVE:
          return Token.ETH_MAINNET
        case TokenCategory.GLM:
          return Token.GLM_MAINNET
      }
  }
}
