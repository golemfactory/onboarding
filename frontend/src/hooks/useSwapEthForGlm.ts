//useSwapForToken could be more general token
//and maybe even hooks wrapper on uniswap would be useful tool

import { getContracts } from 'utils/getContracts'
import { useNetwork } from './useNetwork'
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from 'wagmi'
import uniswapV2Abi from 'ethereum/contracts/uniswap/v2/abi.json'
// import debug from 'debug'

// const log = debug('useSwapEthForGlm')

export const useSwapEthForGlm = ({ value }: { value: bigint }) => {
  const { chain } = useNetwork()
  if (!chain) throw new Error('Chain is not defined')
  //TODO : move to hook
  const contracts = getContracts(chain.id)
  const { address: to } = useAccount()
  const { writeContract, data, isError: isErrorPrepare } = useWriteContract()

  const {
    isSuccess,
    isError: isErrorTransaction,
    isLoading,
  } = useWaitForTransactionReceipt({
    hash: data,
  })

  return {
    swap: async () => {
      const params = {
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
        // gas: BigInt('100000'),
      }

      let retries = 0
      const maxRetries = 3

      while (retries < maxRetries) {
        try {
          await writeContract(params)
          break
        } catch (e) {
          console.error(`Error in swap attempt ${retries + 1}:`, e)
          retries++
        }
      }

      if (retries === maxRetries) {
        console.error('Max retries reached. Swap failed.')
      }
    },
    data,
    isError: isErrorPrepare || isErrorTransaction,
    isSuccess,
    isLoading,
  }
}
