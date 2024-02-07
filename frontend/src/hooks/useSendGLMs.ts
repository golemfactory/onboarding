import { useContractWrite, usePublicClient } from 'wagmi'
import { useNetwork } from 'hooks/useNetwork'
import { erc20abi } from 'ethereum/contracts'
import { getGLMToken } from 'utils/getGLMToken'
import { TxStatus } from 'types/ethereum'
import { useEffect, useState } from 'react'
//this could be done better having a useERC20ContractWrite hook
import debug from 'debug'
const log = debug('useSendGLMs')
export const useSendGLMs = () => {
  const { chain } = useNetwork()
  const publicClient = usePublicClient()

  const [status, setStatus] = useState(TxStatus.READY)
  //TODO : what is 'isIdle'
  const { data, isSuccess, isError, isIdle, isLoading, writeAsync } =
    useContractWrite({
      address: chain?.id ? getGLMToken(chain.id).address : undefined,
      abi: erc20abi,
      functionName: 'transfer',
    })

  useEffect(() => {
    if (data?.hash) {
      publicClient
        ?.waitForTransactionReceipt({
          hash: data?.hash,
        })
        .then(() => {
          log('GLM Transaction included in block')
          setStatus(TxStatus.SUCCESS)
        })
        .catch(() => {
          log('GLM Transaction not included in block')
          setStatus(TxStatus.SUCCESS)
        })
    }
  }, [data?.hash])

  useEffect(() => {
    if (isError) {
      console.log('error', isError, data)
      setStatus(TxStatus.ERROR)
    }
    if (isLoading) {
      setStatus(TxStatus.LOADING)
    }
  }, [isSuccess, isError, isIdle, isLoading])

  return {
    status,
    send: async ({ to, value }: { to: string; value: bigint }) => {
      setStatus(TxStatus.PENDING)
      await writeAsync({
        args: [to, value],
      })
    },
  }
}
