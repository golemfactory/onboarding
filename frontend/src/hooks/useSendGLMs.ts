import { useContractWrite } from 'wagmi'
import { useNetwork } from 'hooks/useNetwork'
import { erc20abi } from 'ethereum/contracts'
import { getGLMToken } from 'utils/getGLMToken'
import { TxStatus } from 'types/ethereum'
import { useEffect } from 'react'
//this could be done better having a useERC20ContractWrite hook

export const useSendGLMs = () => {
  const { chain } = useNetwork()

  const [status, setStatus] = useState<TxStatus>(TxStatus.READY)

  if (!chain) throw new Error('Chain is not defined')

  //TODO : what is 'isIdle'
  const { isSuccess, isError, isIdle, isLoading, write } = useContractWrite({
    address: getGLMToken(chain.id).address,
    abi: erc20abi,
    functionName: 'transfer',
  })

  useEffect(() => {
    if (isSuccess) {
      setStatus(TxStatus.SUCCESS)
    }
    if (isError) {
      setStatus(TxStatus.ERROR)
    }
    if (isIdle) {
      setStatus(TxStatus.PENDING)
    }
    if (isLoading) {
      setStatus(TxStatus.PENDING)
    }
  }, [isSuccess, isError, isIdle, isLoading])

  return {
    status,
    send: write,
  }
}
