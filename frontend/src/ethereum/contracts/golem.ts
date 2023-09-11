import { EthereumAddress, assertEthereumAddress } from 'types/ethereum'
import { Network } from '../networks'

export const GOLEM_ADDRESS: Record<Network, EthereumAddress> = (() => {
  const golemPolygon = '0x0B220b82F3eA3B7F6d9A1D8ab58930C064A2b5Bf'
  const golemMumbai = '0x7c2c195CD6D34B8F845992d380aADB2730bB9C6F'
  assertEthereumAddress(golemPolygon)
  assertEthereumAddress(golemMumbai)
  return {
    [Network.POLYGON]: golemPolygon,
    [Network.MUMBAI]: golemMumbai,
  }
})()
