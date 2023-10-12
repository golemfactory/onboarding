import {
  glmMumbai,
  glmPolygon,
  wmaticMumbai,
  wmaticPolygon,
} from 'ethereum/tokens'
import { glmMainnet } from 'ethereum/tokens/glm/mainnet'
import {
  IContracts,
  assertSupportedChainId,
  Network,
  assertEthereumAddress,
  NetworkType,
} from 'types/ethereum'

export const getContracts: (chainId: NetworkType) => IContracts = (chainId) => {
  assertSupportedChainId(chainId)

  const uniswapV2Polygon = '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff'
  const uniswapV2Mumbai = '0xEfC98B469eC61aa065ccd2099521154860590C6c'
  const uniswapV2Mainnet = '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45'

  assertEthereumAddress(uniswapV2Polygon)
  assertEthereumAddress(uniswapV2Mumbai)
  assertEthereumAddress(uniswapV2Mainnet)

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
      swapPath: [wmaticMumbai.address, glmMumbai.address],
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
      swapPath: [wmaticPolygon.address, glmPolygon.address],
    },
    [Network.MAINNET]: {
      uniswapV2: {
        address: uniswapV2Mainnet,
      },
      GLM: {
        address: glmMainnet.address,
      },
      swapPath: [glmMainnet.address],
    },
  }[chainId]
}
