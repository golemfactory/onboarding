import { useAccount, useBalance } from 'wagmi'
import { useNetwork } from 'hooks/useNetwork'
import { getGLMToken } from 'utils/getGLMToken'

export const useGLMBalance = () => {
  const { chain } = useNetwork()
  const { address } = useAccount()
  const { data } = useBalance({
    address,
    token: chain?.id ? getGLMToken(chain?.id).address : undefined,
  })
  return {
    balance: data,
  }
}
