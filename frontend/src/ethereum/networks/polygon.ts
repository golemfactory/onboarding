import { INetwork, Network, Token } from 'types/ethereum'
import { maticMumbai } from '..'

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
}
