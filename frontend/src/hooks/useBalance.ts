import { getGLMToken } from 'utils/getGLMToken'
import { useAccount, useBalance as useBalanceWagmi } from 'wagmi'
import { useNetwork } from 'hooks/useNetwork'
import { TokenCategory } from 'types/ethereum'

export const useBalance = () => {
  const { address } = useAccount()
  const { chain } = useNetwork()
  if (!chain) throw new Error('Chain is not defined')

  const glmAddress = getGLMToken(chain?.id).address

  const glmBalance = useBalanceWagmi({
    address,
    token: glmAddress as `0x${string}`,
  })

  const nativeBalance = useBalanceWagmi({
    address,
  })

  //this should never happen
  //as long as we have proper address and chain

  if (!glmBalance.data?.formatted || !nativeBalance.data?.formatted)
    throw new Error('Missing balance')

  return {
    [TokenCategory.GLM]: glmBalance.data?.value,
    [TokenCategory.NATIVE]: nativeBalance.data?.value,
  }
}
