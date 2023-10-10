import { useAccount, useBalance } from 'wagmi'
import { useNetwork } from 'hooks/useNetwork'
import { getGLMToken } from 'utils/getGLMToken'

export const useGLMBalance = () => {
  const { chain } = useNetwork()

  if (!chain) throw new Error('Chain is not defined')

  const { address } = useAccount()

  const { data } = useBalance({
    address,
    //this is interesting why EthereumAddress that check regex is not conidere proper `0x${string}` type
    //TODO : investigate
    //for now 'as' code smell is used
    token: getGLMToken(chain?.id).address as `0x${string}`,
  })

  return {
    balance: data,
  }
}
