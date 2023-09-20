import { IContracts, assertSupportedChainId, Network, assertEthereumAddress, NetworkType } from 'types/ethereum'

export const getContracts: (chainId: string) => IContracts = (chainId) => {
  assertSupportedChainId(chainId)

  const uniswapV2Polygon = '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff'
  const uniswapV2Mumbai = '0xEfC98B469eC61aa065ccd2099521154860590C6c'

  const WMATICPolygon = '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270'
  const WMATICMumbai = '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889'
  const GLMPolygon = '0x0b220b82f3ea3b7f6d9a1d8ab58930c064a2b5bf'
  const GLMMumbai = '0x2036807B0B3aaf5b1858EE822D0e111fDdac7018'

  assertEthereumAddress(uniswapV2Polygon)
  assertEthereumAddress(uniswapV2Mumbai)
  assertEthereumAddress(WMATICPolygon)
  assertEthereumAddress(WMATICMumbai)
  assertEthereumAddress(GLMPolygon)
  assertEthereumAddress(GLMMumbai)

  return {
    [Network.MUMBAI]: {
      uniswapV2: {
        address: uniswapV2Mumbai,
      },
      GLM: {
        address: GLMMumbai,
      },
      wrappedNativeToken: {
        address: WMATICMumbai,
      },
    },
    [Network.POLYGON]: {
      uniswapV2: {
        address: uniswapV2Polygon,
      },
      GLM: {
        address: GLMPolygon,
      },
      wrappedNativeToken: {
        address: WMATICPolygon,
      },
    },
  }[chainId]
}
