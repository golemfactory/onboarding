import { Token, Network, INativeToken } from 'types/ethereum'

export const maticMumbai: INativeToken = {
  isNative: true,
  name: 'Matic',
  decimals: 18,
  symbol: Token.MATIC_MUMBAI,
  network: Network.MUMBAI,
}
