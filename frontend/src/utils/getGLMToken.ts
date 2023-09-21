import { glmMumbai } from 'ethereum/tokens'
import { Network, NetworkType } from 'types/ethereum'
import { getChainId } from './getChain'

export const getGLMToken = async () => {
  const network = await getChainId()
  switch (network) {
    case Network.MUMBAI:
      return glmMumbai
    case Network.POLYGON:
      return glmMumbai
  }
}
