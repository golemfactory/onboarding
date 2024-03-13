import { useContractWrite, usePublicClient, useWriteContract } from 'wagmi'
import { useNetwork } from 'hooks/useNetwork'
import { erc20abi } from 'ethereum/contracts'
import { getGLMToken } from 'utils/getGLMToken'
import { TxStatus } from 'types/ethereum'
import { useEffect, useState } from 'react'
//this could be done better having a useERC20ContractWrite hook
import debug from 'debug'
const log = debug('useSendGLMs')
export const useSendGLMs = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { chain } = useNetwork()
  if (!chain) throw new Error('Chain is not defined')
  const publicClient = usePublicClient()

  const [status, setStatus] = useState(TxStatus.READY)
  //TODO : what is 'isIdle'
  const { data, isSuccess, isError, isIdle, writeContractAsync } =
    useWriteContract()

  const writeAsync = async ({ args }: { args: [string, BigInt] }) => {
    console.log('write async', args)
    setIsLoading(true)
    await writeContractAsync({
      address: getGLMToken(chain.id).address,
      abi: erc20abi,
      functionName: 'transfer',
      args,
    })
  }
  useEffect(() => {
    if (data) {
      publicClient
        ?.waitForTransactionReceipt({
          hash: data,
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
  }, [data])

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
      console.log('sending', to, value)
      setStatus(TxStatus.PENDING)
      await writeAsync({
        args: [to, value],
      })
    },
  }
}
