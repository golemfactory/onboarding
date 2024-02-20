import { useChains } from 'wagmi'
import { useAccount } from './useAccount'
import { toHex } from 'viem'
import { Chain } from 'types/wagmi'
import { assertSupportedChainId } from 'types/ethereum'
import { polygon, mainnet, polygonMumbai } from 'viem/chains'

type NetworkReturnType = { chain: Chain; chains: Chain[] }

/**.
 * @param chain The wagmi Chain  object with number id .
 * @returns The  Chain object with hex string id .
 */
const formatChain = (chain: { id: number }): Chain => {
  const chainId = toHex(chain.id)

  assertSupportedChainId(chainId)

  //wagmi in version 2 changed hooks so now useNetwork returns only chain id
  //and we need to get chain data for backward compatibility

  const chainData = [polygon, mainnet, polygonMumbai].find(
    (_chain) => _chain.id === chain.id
  )

  return {
    ...chainData,
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

//there are two possible behaviors when there is no connected chain

// 1. throw an error immediately the component that uses useNetwork can assume that there is a connected chain and it is safe to use it
// 2. return null and let the component handle the case when there is no connected chain

//TODO : refactor so useNetwork takes { shouldThrow: boolean } as an argument
//for better readability and to avoid confusion

export function useNetwork(shouldThrow: false): {
  chain: Chain | null
  chains: Chain[]
}

export function useNetwork(shouldThrow: true): NetworkReturnType

export function useNetwork(): NetworkReturnType

export function useNetwork(shouldThrow: boolean = true) {
  const account = useAccount(shouldThrow)
  const chains = useChains()
  if (!account.chainId) {
    if (shouldThrow) {
      throw new Error('No connected chain')
    }
    return { chain: null, chains: chains.map(formatChain) }
  }
  return {
    chain: formatChain({ id: account.chainId }),
    chains: chains.map(formatChain),
  }
}
