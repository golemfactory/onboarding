export * from './mumbai'
export * from './polygon'

import { Network } from 'types/ethereum'
import { MUMBAI } from './mumbai'
import { POLYGON } from './polygon'

const networks = {
  [Network.MUMBAI]: MUMBAI,
  [Network.POLYGON]: POLYGON,
}

export { networks, MUMBAI, POLYGON }
