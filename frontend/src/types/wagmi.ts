import { Chain as ChainWagmi } from 'wagmi'
import { NetworkType } from './ethereum'

export type Chain = Omit<ChainWagmi, 'id'> & { id: NetworkType }
