import { INetwork, Network } from 'types/ethereum'
import { glmMumbai, maticMumbai } from '..'

export const MUMBAI: INetwork = {
  chainId: Network.MUMBAI,
  chainName: 'Mumbai Testnet',
  rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
  blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
  nativeCurrency: {
    //@ts-ignore
    symbol: 'MATIC',
    decimals: 18,
  },
}
