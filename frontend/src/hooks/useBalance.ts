import { getGLMToken } from 'utils/getGLMToken'
import { useBalance as useBalanceWagmi } from 'wagmi'
import { useNetwork } from 'hooks/useNetwork'
import { useAccount } from 'hooks/useAccount'
import { TokenCategory } from 'types/ethereum'

export const useBalance = () => {
  const { address } = useAccount()
  const { chain } = useNetwork()

  const glmAddress = chain?.id ? getGLMToken(chain?.id).address : undefined

  const glmBalance = useBalanceWagmi({
    address,
    token: glmAddress,
  })

  const nativeBalance = useBalanceWagmi({
    address,
  })

  //this should never happen
  //as long as we have proper address and chain

  if (!glmBalance.data?.formatted || !nativeBalance.data?.formatted)
    throw new Error('Missing balance')

  return {
    [TokenCategory.GLM]: glmBalance.data?.value ?? 0n,
    [TokenCategory.NATIVE]: nativeBalance.data?.value ?? 0n,
  }
}
