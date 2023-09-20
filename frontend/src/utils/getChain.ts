import { NetworkType, assertSupportedChainId } from 'types/ethereum'

export const getChainId = (): NetworkType => {
  assertSupportedChainId(window.ethereum.chainId)
  return window.ethereum.chainId
}
