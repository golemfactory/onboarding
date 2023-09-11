import { EthereumAddress, assertEthereumAddress } from 'types/ethereum'
import { Network } from '../networks'

export const GOLEM_ADDRESS: Record<Network, EthereumAddress> = (() => {
  const maticPolygon = '0x0000000000000000000000000000000000001010'
  const maticMumbai = '0x0000000000000000000000000000000000001010'
  assertEthereumAddress(maticPolygon)
  assertEthereumAddress(maticMumbai)
  return {
    [Network.POLYGON]: maticPolygon,
    [Network.MUMBAI]: maticMumbai,
  }
})()
