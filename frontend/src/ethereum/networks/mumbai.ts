import { ISupportedNetwork, Network, Token } from 'types/ethereum'

export const MUMBAI: ISupportedNetwork = {
  chainId: Network.MUMBAI,
  chainName: 'Mumbai Testnet',
  rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
  blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
  nativeCurrency: {
    name: 'MATIC',
    symbol: Token.MATIC,
    decimals: 18,
  },
}
