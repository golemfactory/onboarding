import { glmMumbai } from 'ethereum/tokens'
import { Network } from 'types/ethereum'
import { getChainId } from './getChain'

export const getGLMToken = () => {
  const network = getChainId()
  switch (network) {
    case Network.MUMBAI:
      return glmMumbai
    case Network.POLYGON:
      return glmMumbai
  }
}
