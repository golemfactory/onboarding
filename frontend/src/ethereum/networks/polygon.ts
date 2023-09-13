import { INetwork } from 'src/types/ethereum'

export const POLYGON: INetwork = {
  chainId: '0x89',
  chainName: 'Polygon',
  rpcUrls: ['https://polygon-rpc.com/'],
  blockExplorerUrls: ['https://polygonscan.com/'],
  nativeCurrency: {
    name: 'MATIC',
    symbol: 'MATIC',
    decimals: 18,
  },
}
