import { EthereumAddress, Token, Network, IUtilityToken } from 'types/ethereum'

export const glmMumbai: IUtilityToken = {
  isNative: false,
  name: 'Golem',
  decimals: 18,
  address: '0x2036807B0B3aaf5b1858EE822D0e111fDdac7018' as EthereumAddress,
  symbol: Token.GLM_MUMBAI,
  network: Network.MUMBAI,
}
