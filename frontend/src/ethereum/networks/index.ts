export * from './mumbai'
export * from './polygon'

import { Network } from 'types/ethereum'
import { MUMBAI } from './mumbai'
import { POLYGON } from './polygon'
import { MAINNET } from './mainnet'

const networks = {
  [Network.MUMBAI]: MUMBAI,
  [Network.POLYGON]: POLYGON,
  [Network.MAINNET]: MAINNET,
}

export { networks, MUMBAI, POLYGON }
