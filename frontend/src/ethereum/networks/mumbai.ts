import { INetwork } from 'src/types/ethereum'

export const MUMBAI: INetwork = {
  chainId: '0x13881',
  chainName: 'Mumbai Testnet',
  rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
  blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
  nativeCurrency: {
    name: 'MATIC',
    symbol: 'MATIC',
    decimals: 18,
  },
}
