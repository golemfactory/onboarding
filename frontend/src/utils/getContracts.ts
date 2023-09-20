import { glmMumbai, glmPolygon, wmaticMumbai, wmaticPolygon } from 'ethereum/tokens'
import { IContracts, assertSupportedChainId, Network, assertEthereumAddress } from 'types/ethereum'

export const getContracts: (chainId: string) => IContracts = (chainId) => {
  assertSupportedChainId(chainId)

  const uniswapV2Polygon = '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff'
  const uniswapV2Mumbai = '0xEfC98B469eC61aa065ccd2099521154860590C6c'

  assertEthereumAddress(uniswapV2Polygon)
  assertEthereumAddress(uniswapV2Mumbai)

  return {
    [Network.MUMBAI]: {
      uniswapV2: {
        address: uniswapV2Mumbai,
      },
      GLM: {
        address: glmMumbai.address,
      },
      wrappedNativeToken: {
        address: wmaticMumbai.address,
      },
    },
    [Network.POLYGON]: {
      uniswapV2: {
        address: uniswapV2Polygon,
      },
      GLM: {
        address: glmPolygon.address,
      },
      wrappedNativeToken: {
        address: wmaticPolygon.address,
      },
    },
  }[chainId]
}
