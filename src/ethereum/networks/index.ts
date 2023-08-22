import { POLYGON } from './polygon'
import { MUMBAI } from './mumbai'
import { INetwork } from 'src/types/ethereum'

type NetworkName = 'POLYGON' | 'MUMBAI'

type Networks = {
  [key in NetworkName]: INetwork
}

export const networks: Networks = {
  POLYGON,
  MUMBAI,
}
