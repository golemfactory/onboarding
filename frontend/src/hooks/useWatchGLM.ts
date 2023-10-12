import { useNetwork } from 'hooks/useNetwork'
import { useWatchAsset } from 'hooks/useWatchAsset'
import { getGLMToken } from 'utils/getGLMToken'

export const useWatchGLM = () => {
  const { chain } = useNetwork()

  const { watch, success } = useWatchAsset()

  const watchGLM = async () => {
    if (!chain?.id) throw new Error('Missing chain id')
    return await watch({
      address: getGLMToken(chain.id).address,
      decimals: 18,
      symbol: 'GLM',
    })
  }

  return {
    watch: watchGLM,
    success,
  }
}
