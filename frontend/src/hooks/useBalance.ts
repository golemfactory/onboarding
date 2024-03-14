import { getGLMToken } from 'utils/getGLMToken'
import { useBalance as useBalanceWagmi } from 'wagmi'
import { useNetwork } from 'hooks/useNetwork'
import { useAccount } from 'hooks/useAccount'
import { EthereumAddress, TokenCategory } from 'types/ethereum'

export const useBalance = (addr?: EthereumAddress) => {
  const { address } = useAccount(false)
  const { chain } = useNetwork(false)

  const glmAddress = chain?.id ? getGLMToken(chain?.id).address : undefined

  const settings = {
    query: {
      refetchInterval: 2000,
    },
  }
  const glmBalance = useBalanceWagmi({
    address: addr || address,
    token: glmAddress,
    ...settings,
  })

  const nativeBalance = useBalanceWagmi({
    address: addr || address,
    ...settings,
  })

  return {
    [TokenCategory.GLM]: glmBalance.data?.value ?? 0n,
    [TokenCategory.NATIVE]: nativeBalance.data?.value ?? 0n,
  }
}
