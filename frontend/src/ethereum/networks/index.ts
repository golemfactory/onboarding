// import { POLYGON } from './polygon'
import { MUMBAI } from './mumbai'
import { INetwork } from 'src/types/ethereum'
import { POLYGON } from './polygon'

export enum Network {
  POLYGON = '0x89',
  MUMBAI = '0x13881',
}
type Networks = Record<Network, INetwork>

export const networks: Networks = {
  [Network.POLYGON]: POLYGON,
  [Network.MUMBAI]: MUMBAI,
}
