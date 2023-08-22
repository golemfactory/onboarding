import { networks } from '../ethereum/networks'

export async function addNetwork(network: keyof typeof networks) {
  try {
    //TODO : better typing for window.ethereum is needed
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [networks[network]],
    })
  } catch (error) {
    throw error
  }
}
