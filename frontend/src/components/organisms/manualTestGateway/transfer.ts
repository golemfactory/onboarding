import { getExpectedBalances, testingPath } from './testingPaths'
import { EthereumAddress, Network } from 'types/ethereum'
import { JsonRpcSigner, ethers } from 'ethers'
import { GLM } from 'ethereum/tokens/glm/GLM'
import { erc20abi } from 'ethereum/contracts'

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
  const golemAddress = GLM.getAddress(network)

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

  return balances
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

  const tokenContract = new ethers.Contract(golemAddress, erc20abi, signer)

  await tokenContract.transfer(address, balance)
}
