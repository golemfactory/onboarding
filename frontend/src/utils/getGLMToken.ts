import { glmMumbai, glmPolygon } from 'ethereum/tokens'
import { Network, NetworkType } from 'types/ethereum'
import { glmMainnet } from 'ethereum/tokens/glm/mainnet'
export const getGLMToken = (network: NetworkType) => {
  switch (network) {
    case Network.MUMBAI:
      return glmMumbai
    case Network.POLYGON:
      return glmPolygon
    case Network.MAINNET:
      return glmMainnet
  }
}
