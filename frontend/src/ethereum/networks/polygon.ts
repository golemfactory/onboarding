import { ISupportedNetwork, Network, Token } from 'types/ethereum'

export const POLYGON: ISupportedNetwork = {
  chainId: Network.POLYGON,
  chainName: 'Polygon',
  rpcUrls: ['https://polygon-rpc.com/'],
  blockExplorerUrls: ['https://polygonscan.com/'],
  nativeCurrency: {
    name: 'MATIC',
    symbol: Token.MATIC,
    decimals: 18,
  },
}
