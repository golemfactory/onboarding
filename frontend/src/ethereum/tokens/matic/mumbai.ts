import { Token, Network, INativeToken } from 'types/ethereum'

export const maticMumbai: INativeToken = {
  isNative: true,
  name: 'Pol',
  decimals: 18,
  symbol: Token.POL_MUMBAI,
  network: Network.MUMBAI,
}
