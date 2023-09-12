import { Network } from 'ethereum/networks'
import { getExpectedBalances, testingPath, testingSetup } from './testingPaths'
import { EthereumAddress } from 'types/ethereum'
import { JsonRpcSigner, ethers } from 'ethers'

import erc20Abi from 'ethereum/contracts/erc20token/abi.json'
import { GOLEM_ADDRESS } from 'ethereum/contracts'
export const transferInitialBalances = async ({
  testingPath,
  address,
  signer,
}: {
  testingPath: testingPath
  address: EthereumAddress
  signer: JsonRpcSigner
}) => {
  const network = Network.MUMBAI
  const balances = getExpectedBalances({ testingPath, network })
  const golemAddress = GOLEM_ADDRESS[network]

  await sendGolemToken({
    balance: ethers.parseEther(balances.glm.toString()),
    signer,
    address,
    golemAddress,
  })

  await sendNativeToken({
    balance: ethers.parseEther(balances.native.toString()),
    signer,
    address,
  })

  console.log('sjoiuld redirect here')

  return
}

const sendNativeToken = async ({
  balance,
  signer,
  address,
}: {
  balance: bigint
  signer: JsonRpcSigner
  address: EthereumAddress
}) => {
  if (balance === 0n) {
    console.log('No native token to send')
    return
  }
  const tx = await signer.sendTransaction({
    to: address,
    value: balance,
  })
  await tx.wait()
}

const sendGolemToken = async ({
  balance,
  signer,
  address,
  golemAddress,
}: {
  balance: bigint
  signer: JsonRpcSigner
  address: EthereumAddress
  golemAddress: EthereumAddress
}) => {
  if (balance === 0n) {
    console.log('No golem token to send')
    return
  }

  const tokenContract = new ethers.Contract(golemAddress, erc20Abi, signer)

  await tokenContract.transfer(address, balance)
}
