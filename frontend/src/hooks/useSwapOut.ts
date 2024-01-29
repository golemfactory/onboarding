import { useContractRead } from 'wagmi'
import { useNetwork } from './useNetwork'
import { uniswapV2abi } from 'ethereum/contracts'
import { EthereumAddress } from 'types/ethereum'
import { useEffect, useState } from 'react'
import { getContracts } from 'utils/getContracts'

export const useSwapOut = () => {
  const { chain } = useNetwork()
  const [path, setPath] = useState<EthereumAddress[]>([])
  const [uniswapAddress, setUniswapAddress] = useState<EthereumAddress>(
    '' as EthereumAddress
  )
  const [amountIn, setAmountIn] = useState<bigint>(0n)

  console.log('a', amountIn)
  useEffect(() => {
    if (chain?.id) {
      setPath(getContracts(chain.id).swapPath)
      setUniswapAddress(getContracts(chain.id).uniswapV2.address)
    }
  }, [chain?.id])

  //TODO: make contract hooks types, using zod and typechain
  const { data, isError, isLoading } = useContractRead({
    address: uniswapAddress,
    abi: uniswapV2abi,
    functionName: 'getAmountsOut',
    args: [amountIn, path],
  })

  return {
    data,
    isError,
    isLoading,
    setAmountIn,
  } as {
    data: bigint[]
    isError: boolean
    isLoading: boolean
    setAmountIn: (amount: bigint) => void
  }
}
