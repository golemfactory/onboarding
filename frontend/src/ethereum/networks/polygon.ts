import { INetwork, Network } from 'types/ethereum'

export const POLYGON: INetwork = {
  chainId: Network.POLYGON,
  chainName: 'Polygon',
  rpcUrls: ['https://polygon-rpc.com/'],
  blockExplorerUrls: ['https://polygonscan.com/'],
  nativeCurrency: {
    //@ts-ignore
    symbol: 'MATIC',
    decimals: 18,
  },
  isProduction: true,
}
