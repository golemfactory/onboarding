import {
  USDC,
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
  EthereumAddress,
} from 'types/ethereum'

export const getContracts: (chainId: NetworkType) => IContracts = (chainId) => {
  assertSupportedChainId(chainId)

  const uniswapV2Polygon = '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff'
  const uniswapV2Mumbai = '0xEfC98B469eC61aa065ccd2099521154860590C6c'
  const uniswapV2Mainnet = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'

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
      USDC: {
        address: USDC.mumbai.address,
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
      USDC: {
        address: USDC.polygon.address,
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
      USDC: {
        address: USDC.mainnet.address,
      },
      wrappedNativeToken: {
        address:
          '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2' as EthereumAddress,
      },
      swapPath: [glmMainnet.address],
    },
  }[chainId]
}
