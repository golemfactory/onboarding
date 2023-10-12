//useSwapForToken could be more general token
//and maybe even hooks wrapper on uniswap would be useful tool

import { getContracts } from 'utils/getContracts'
import { useNetwork } from './useNetwork'
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import uniswapV2Abi from 'ethereum/contracts/uniswap/v2/abi.json'

export const useSwapEthForGlm = ({ value }: { value: bigint }) => {
  const { chain } = useNetwork()
  if (!chain) throw new Error('Chain is not defined')
  const contracts = getContracts(chain.id)
  const { address: to } = useAccount()
  const { config, isError: isErrorPrepare } = usePrepareContractWrite({
    address: contracts.uniswapV2.address,
    abi: uniswapV2Abi,
    functionName: 'swapExactETHForTokens',
    value,
    args: [
      0,
      contracts.swapPath,
      to,
      BigInt('9223372036854775807'), // 2^63 - 1
    ],
  })

  const { data, write } = useContractWrite(config)

  const { isSuccess, isError: isErrorTransaction } = useWaitForTransaction({
    hash: data?.hash,
  })

  return {
    swap: write,
    data,
    isError: isErrorPrepare || isErrorTransaction,
    isSuccess,
  }
}
