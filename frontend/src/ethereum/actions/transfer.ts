import { getExpectedBalances } from '../../components/organisms/manualTestGateway/testingPaths'
import { EthereumAddress } from 'types/ethereum'
import { JsonRpcSigner, ethers } from 'ethers'
import { getContracts } from 'utils/getContracts'
import { getChainId } from 'utils/getChain'
import { erc20abi } from 'ethereum/contracts'

import { BalanceCaseType } from 'types/path'

export const sendNativeToken = async ({
  balance,
  signer,
  address,
}: {
  balance: bigint
  signer: JsonRpcSigner
  address: EthereumAddress
}): Promise<ethers.TransactionResponse> => {
  if (balance === 0n) {
    throw new Error('No native token to send')
  }
  const tx = await signer.sendTransaction({
    to: address,
    value: balance,
  })
  return tx
}

export const sendGolemToken = async ({
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
    throw new Error('No golem token to send')
  }

  const tokenContract = new ethers.Contract(golemAddress, erc20abi, signer)

  const tx = await tokenContract.transfer(address, balance)
  return tx
}

export const transferInitialBalances = async ({
  testingPath,
  address,
  signer,
}: {
  testingPath: BalanceCaseType
  address: EthereumAddress
  signer: JsonRpcSigner
}) => {
  const balances = getExpectedBalances({ testingPath })
  const golemAddress = getContracts(getChainId()).GLM.address

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
