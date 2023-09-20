//TODO make it more general

import { getContracts } from './getContracts'
import { ethers } from 'ethers'
import erc20Abi from 'ethereum/contracts/erc20token/abi.json'
import { getSigner } from './getSigner'

export const getBalances = async () => {
  const network = window.ethereum.chainId
  const contracts = getContracts(network)

  const provider = new ethers.BrowserProvider(window.ethereum)
  const address = window.ethereum.selectedAddress

  const signer = await getSigner()
  const tokenContract = new ethers.Contract(contracts.GLM.address, erc20Abi, signer)

  return {
    Native: await provider.getBalance(address),
    GLM: await tokenContract.balanceOf(address),
  }
}
