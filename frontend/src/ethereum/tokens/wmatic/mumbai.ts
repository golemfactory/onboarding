import { EthereumAddress, Token, Network, IWrappedToken } from 'types/ethereum'

export const wmaticMumbai: IWrappedToken = {
  isNative: false,
  name: 'Golem',
  decimals: 18,
  address: '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889' as EthereumAddress,
  symbol: Token.WMATIC_MUMBAI,
  network: Network.MUMBAI,
}
