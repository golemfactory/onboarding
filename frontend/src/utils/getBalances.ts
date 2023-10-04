//TODO make it more general

import { getContracts } from './getContracts'
import { ethers } from 'ethers'
import erc20Abi from 'ethereum/contracts/erc20token/abi.json'
import { getSigner } from './getSigner'
import { TokenCategory } from 'types/ethereum'

export const getBalances = async (): Promise<Record<TokenCategory, bigint>> => {
  //read network from window.ethereum (TODO: sdk from metamask or finally general sdk that is able to
  //work with different wallets)

  const network = await window.ethereum.request({
    method: 'eth_chainId',
  })

  console.log('network: ', network)
  if (network === '0x1') {
    return {
      [TokenCategory.NATIVE]: 0n,
      [TokenCategory.GLM]: 0n,
    }
  }

  const contracts = getContracts(network)

  const provider = new ethers.BrowserProvider(window.ethereum)
  const address = window.ethereum.selectedAddress

  const signer = await getSigner()

  const tokenContract = new ethers.Contract(
    contracts.GLM.address,
    erc20Abi,
    signer
  )

  const nativeBalance = await provider.getBalance(address)

  const glmBalance = await tokenContract.balanceOf(address)

  console.log('nativeBalance: ', nativeBalance)
  return {
    [TokenCategory.NATIVE]: nativeBalance,
    [TokenCategory.GLM]: glmBalance,
  }
}
