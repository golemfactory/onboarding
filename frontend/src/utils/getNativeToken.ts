import { NativeTokenType, Network, Token } from 'types/ethereum'
import { getChainId } from './getChain'

export const getNativeToken = (): NativeTokenType => {
  const chainId = getChainId()

  switch (chainId) {
    case Network.POLYGON:
      return Token.MATIC_POLYGON
    case Network.MUMBAI:
      return Token.MATIC_MUMBAI
  }
}
