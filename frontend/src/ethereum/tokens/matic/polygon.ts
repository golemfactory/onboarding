import { Token, Network, INativeToken } from 'types/ethereum'

export const maticPolygon: INativeToken = {
  isNative: true,
  name: 'Matic',
  decimals: 18,
  symbol: Token.POL_POLYGON,
  network: Network.POLYGON,
}
