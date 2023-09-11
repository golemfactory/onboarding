// import { POLYGON } from './polygon'
import { MUMBAI } from './mumbai'
import { INetwork } from 'src/types/ethereum'
import { POLYGON } from './polygon'

export enum Network {
  POLYGON = 'POLYGON',
  MUMBAI = 'MUMBAI',
}
type Networks = Record<Network, INetwork>

export const networks: Networks = {
  [Network.POLYGON]: POLYGON,
  [Network.MUMBAI]: MUMBAI,
}
