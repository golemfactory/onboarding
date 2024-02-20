//useSwapForToken could be more general token
// //and maybe even hooks wrapper on uniswap would be useful tool

import { EthereumAddress, NetworkType } from 'types/ethereum'

import { getContracts } from 'utils/getContracts'
import { useNetwork } from './useNetwork'
import { useReadContract, useReadContracts } from 'wagmi'
import uniswapV2Abi from 'ethereum/contracts/uniswap/v2/abi.json'
import { useEffect, useState } from 'react'
import { fromHex } from 'viem'

export const useExchangeRate = ({
  tokenIn,
  tokenOut,
}: {
  tokenIn: EthereumAddress
  tokenOut: EthereumAddress
}) => {
  const { chain } = useNetwork()
  //TODO : move to hook
  const contracts = getContracts(chain.id)
  const { data, isLoading } = useReadContracts({
    contracts: [
      {
        address: contracts.uniswapV2.address,
        abi: uniswapV2Abi,
        functionName: 'getAmountOut',
        args: [100, tokenIn, tokenOut],
      },
    ],
  })

  return { data, isLoading }
}

export const useOnboardingExchangeRates = (chainId?: NetworkType) => {
  const { chain } = useNetwork(false)
  const [usdcToGLM, setUsdcToGLM] = useState(0)
  const [usdcToNative, setUsdcToNative] = useState(0)
  chainId = chainId || chain?.id
  if (!chainId) throw new Error('Chain is not defined')
  const contracts = getContracts(chainId)

  const { data: usdcToNativeWei, isLoading: glmToUsdcLoading } =
    useReadContract({
      address: contracts.uniswapV2.address,
      abi: uniswapV2Abi,
      functionName: 'getAmountsOut',
      args: [
        //as usdc has 6 decimals
        Math.pow(10, 6),
        [contracts.USDC.address, contracts.wrappedNativeToken.address],
      ],
      chainId: fromHex(chainId, 'number'),
    })

  const { data: maticToGLMWei, isLoading: usdcToGlmLoading } = useReadContract({
    address: contracts.uniswapV2.address,
    abi: uniswapV2Abi,
    functionName: 'getAmountsOut',
    args: [
      Math.pow(10, 18),
      [contracts.wrappedNativeToken.address, contracts.GLM.address],
    ],
    chainId: fromHex(chainId, 'number'),
  })

  useEffect(() => {
    //@ts-ignore
    if (usdcToNativeWei?.[1] > 0 && maticToGLMWei?.[1] > 1) {
      setUsdcToNative(
        //@ts-ignore
        Number(usdcToNativeWei[1] / BigInt(Math.pow(10, 11))) / 10000000
      )
      //@ts-ignore
      setUsdcToGLM(
        Number(
          //@ts-ignore
          ((usdcToNativeWei[1] / BigInt(Math.pow(10, 15))) * maticToGLMWei[1]) /
            BigInt(Math.pow(10, 15))
        ) / 1000000
      )
    }
    //@ts-ignore
  }, [usdcToNativeWei?.[1], maticToGLMWei?.[1]])

  return {
    data: { GLM: usdcToGLM, Native: usdcToNative },
    isLoading: glmToUsdcLoading || usdcToGlmLoading,
  }
}
