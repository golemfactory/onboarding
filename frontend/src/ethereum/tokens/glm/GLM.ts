import {
  EthereumAddress,
  ISupportedERC20Token,
  NetworkType,
  Network,
  Token,
  assertEthereumAddress,
} from 'types/ethereum'

export const GLM: ISupportedERC20Token = {
  isNative: false,
  name: 'Golem',
  decimals: 18,
  symbol: Token.GLM,
  getAddress(network: NetworkType): EthereumAddress {
    const golemPolygon = '0x0B220b82F3eA3B7F6d9A1D8ab58930C064A2b5Bf'
    const golemMumbai = '0x2036807B0B3aaf5b1858EE822D0e111fDdac7018'
    assertEthereumAddress(golemPolygon)
    assertEthereumAddress(golemMumbai)
    switch (network) {
      case Network.POLYGON:
        return golemPolygon
      case Network.MUMBAI:
        return golemMumbai
    }
  },
}

GLM.getAddress(Network.POLYGON)
