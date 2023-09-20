import { EthereumAddress, Token, Network, IWrappedToken } from 'types/ethereum'

export const wmaticPolygon: IWrappedToken = {
  isNative: false,
  name: 'Golem',
  decimals: 18,
  address: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270' as EthereumAddress,
  symbol: Token.WMATIC_POLYGON,
  network: Network.POLYGON,
}
