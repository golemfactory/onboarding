import { useAccount, useChainId, UseChainIdReturnType, useChains } from 'wagmi'
import { toHex } from 'viem'
import { Chain } from 'types/wagmi'
import { assertSupportedChainId } from 'types/ethereum'
import { Ok, Err, Result } from 'ts-results'
import { polygon, mainnet, polygonMumbai } from 'viem/chains'
/**.
 * @param chain The gagmi Chain  object with number id .
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

const NOT_CONNECTED = 'no connected to blockchain'
export const useNetwork = () => {
  const account = useAccount()
  const chains = useChains()
  return {
    chain: account.chainId ? formatChain({ id: account.chainId }) : null,
    chains: chains.map(formatChain),
  }
}
