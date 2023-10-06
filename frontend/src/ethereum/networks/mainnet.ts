import { INetwork, Network } from 'types/ethereum'

export const POLYGON: INetwork = {
  chainId: Network.MAINNET,
  chainName: 'Mainnet',
  rpcUrls: ['https://polygon-rpc.com/'],
  blockExplorerUrls: ['https://polygonscan.com/'],
  nativeCurrency: {
    //@ts-ignore
    symbol: 'MATIC',
    decimals: 18,
  },
}
