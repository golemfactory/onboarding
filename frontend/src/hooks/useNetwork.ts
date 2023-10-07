import { useNetwork as useNetworkWagmi } from 'wagmi'
import { toHex } from 'viem'
import { Chain } from 'types/wagmi'
import { Chain as ChainWagmi } from 'wagmi'
import { assertSupportedChainId } from 'types/ethereum'

type GetNetworkResult = ReturnType<typeof useNetworkWagmi>

/**.
 * @param chain The wgagmi Chain  object with number id .
 * @returns The  Chain object with hex string id .
 */
const formatChain = (chain: ChainWagmi): Chain => {
  const chainId = toHex(chain.id)
  assertSupportedChainId(chainId)

  return {
    ...chain,
    id: chainId,
  }
}

/**
 * Custom hook wrapper on original wagmi useNetwork.
 * It makes sure that we use our own Chain type where id is hex string not a number
 * see (https://github.com/wagmi-dev/wagmi/discussions/3095)
 * also it asserts that chain id is supported.
 * @returns An object containing network information with formatted chain and chains array.
 */

export const useNetwork = (): Omit<GetNetworkResult, 'chain' | 'chains'> & {
  chain?: Chain
  chains: Chain[]
} => {
  const network = useNetworkWagmi()

  let chain = undefined

  if (network.chain) {
    chain = formatChain(network.chain)
  }

  return {
    ...network,
    chain,
    chains: network.chains.map(formatChain),
  }
}
