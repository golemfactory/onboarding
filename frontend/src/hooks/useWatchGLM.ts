import { useNetwork } from 'hooks/useNetwork'
import { useWatchAsset } from 'hooks/useWatchAsset'
import { getGLMToken } from 'utils/getGLMToken'

export const useWatchGLM = () => {
  const { chain } = useNetwork()

  if (!chain) {
    throw new Error('Chain is not defined')
  }

  const { watch, success } = useWatchAsset()

  const watchGLM = async () => {
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
