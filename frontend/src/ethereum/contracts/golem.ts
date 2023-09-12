import { EthereumAddress, assertEthereumAddress } from 'types/ethereum'
import { Network } from '../networks'

export const GOLEM_ADDRESS: Record<Network, EthereumAddress> = (() => {
  const golemPolygon = '0x0B220b82F3eA3B7F6d9A1D8ab58930C064A2b5Bf'
  const golemMumbai = '0x2036807B0B3aaf5b1858EE822D0e111fDdac7018'
  assertEthereumAddress(golemPolygon)
  assertEthereumAddress(golemMumbai)
  return {
    [Network.POLYGON]: golemPolygon,
    [Network.MUMBAI]: golemMumbai,
  }
})()
