import { EthereumAddress, IUtilityToken, Network, Token } from 'types/ethereum'

export const glmPolygon: IUtilityToken = {
  isNative: false,
  name: 'Golem',
  decimals: 18,
  address: '0x0B220b82F3eA3B7F6d9A1D8ab58930C064A2b5Bf' as EthereumAddress,
  symbol: Token.GLM_POLYGON,
  network: Network.POLYGON,
}
