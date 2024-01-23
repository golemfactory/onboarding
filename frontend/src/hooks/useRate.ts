//useSwapForToken could be more general token
// //and maybe even hooks wrapper on uniswap would be useful tool

import { EthereumAddress, NetworkType } from 'types/ethereum'

import { getContracts } from 'utils/getContracts'
import { useNetwork } from './useNetwork'
import { useContractRead } from 'wagmi'
import uniswapV2Abi from 'ethereum/contracts/uniswap/v2/abi.json'
import { useEffect, useState } from 'react'

export const useExchangeRate = ({
  tokenIn,
  tokenOut,
}: {
  tokenIn: EthereumAddress
  tokenOut: EthereumAddress
}) => {
  const { chain } = useNetwork()
  if (!chain) throw new Error('Chain is not defined')
  //TODO : move to hook
  const contracts = getContracts(chain.id)
  const { data, isLoading } = useContractRead({
    address: contracts.uniswapV2.address,
    abi: uniswapV2Abi,
    functionName: 'getAmountOut',
    args: [100, tokenIn, tokenOut],
  })

  return { data, isLoading }
}

export const useOnboardingExchangeRates = (chainId: NetworkType) => {
  const { chain } = useNetwork()
  const [usdcToGLM, setUsdcToGLM] = useState(0)
  const [usdcToMatic, setUsdcToMatic] = useState(0)
  if (!chainId && !chain) throw new Error('Chain is not defined')
  const contracts = getContracts(chainId || chain?.id)

  const { data: usdcToMaticWei, isLoading: glmToUsdcLoading } = useContractRead(
    {
      address: contracts.uniswapV2.address,
      abi: uniswapV2Abi,
      functionName: 'getAmountsOut',
      args: [
        Math.pow(10, 6),
        [contracts.USDC.address, contracts.wrappedNativeToken.address],
      ],
    }
  )

  const { data: maticToGLMWei, isLoading: usdcToGlmLoading } = useContractRead({
    address: contracts.uniswapV2.address,
    abi: uniswapV2Abi,
    functionName: 'getAmountsOut',
    args: [
      Math.pow(10, 18),
      [contracts.wrappedNativeToken.address, contracts.GLM.address],
    ],
  })

  useEffect(() => {
    //@ts-ignore
    if (usdcToMaticWei?.[1] > 0 && maticToGLMWei?.[1] > 1) {
      setUsdcToMatic(
        //@ts-ignore
        Number(usdcToMaticWei[1] / BigInt(Math.pow(10, 15))) / 1000
      )
      //@ts-ignore
      setUsdcToGLM(
        Number(
          //@ts-ignore
          ((usdcToMaticWei[1] / BigInt(Math.pow(10, 15))) * maticToGLMWei[1]) /
            BigInt(Math.pow(10, 15))
        ) / 1000000
      )
    }
  }, [usdcToMaticWei, maticToGLMWei])

  return {
    data: { GLM: usdcToGLM, Matic: usdcToMatic },
    isLoading: glmToUsdcLoading || usdcToGlmLoading,
  }
}
