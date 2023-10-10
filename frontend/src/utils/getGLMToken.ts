import { glmMumbai } from 'ethereum/tokens'
import { Network, NetworkType } from 'types/ethereum'
import { glmMainnet } from 'ethereum/tokens/glm/mainnet'
export const getGLMToken = (chainId: NetworkType) => {
  switch (chainId) {
    case Network.MUMBAI:
      return glmMumbai
    case Network.POLYGON:
      return glmMumbai
    case Network.MAINNET:
      return glmMainnet
  }
}
