import { getGLMToken } from 'utils/getGLMToken'
import { useBalance as useBalanceWagmi } from 'wagmi'
import { useNetwork } from 'hooks/useNetwork'
import { useAccount } from 'hooks/useAccount'
import { TokenCategory } from 'types/ethereum'
import { useSetup } from './useSetup'

export const useBalance = () => {
  const { address } = useAccount()
  const { chain } = useNetwork()
  const { yagnaAddress } = useSetup()

  const glmAddress = chain?.id ? getGLMToken(chain?.id).address : undefined

  const glmBalance = useBalanceWagmi({
    address: yagnaAddress,
    token: glmAddress,
    watch: true,
  })

  const nativeBalance = useBalanceWagmi({
    address: yagnaAddress,
    watch: true,
  })

  return {
    [TokenCategory.GLM]: glmBalance.data?.value ?? undefined,
    [TokenCategory.NATIVE]: nativeBalance.data?.value ?? undefined,
  }
}
