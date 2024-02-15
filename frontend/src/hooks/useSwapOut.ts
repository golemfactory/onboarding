import { useReadContracts } from 'wagmi'
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

  useEffect(() => {
    if (chain?.id) {
      setPath(getContracts(chain.id).swapPath)
      setUniswapAddress(getContracts(chain.id).uniswapV2.address)
    }
  }, [chain?.id])

  const { data, isError, isLoading } = useReadContracts({
    contracts: [
      {
        address: uniswapAddress,
        abi: uniswapV2abi,
        functionName: 'getAmountsOut',
        args: [amountIn, path],
      },
    ],
  })

  return {
    data: data?.[0].result as bigint[],
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
