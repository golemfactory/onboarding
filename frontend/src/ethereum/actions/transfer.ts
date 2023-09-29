import { getExpectedBalances } from '../../components/organisms/manualTestGateway/testingPaths'
import { EthereumAddress } from 'types/ethereum'
import { JsonRpcSigner, ethers } from 'ethers'
import { getContracts } from 'utils/getContracts'
import { getChainId } from 'utils/getChain'
import { erc20abi } from 'ethereum/contracts'

import { BalanceCaseType } from 'types/path'
import { useMetaMask } from 'hooks/useMetamask'
import { useEffect, useState } from 'react'
import { useSetup } from 'hooks/useSetup'
import { TokenCategory } from 'types/ethereum'

//TODO : use hooks here so we can better track status of the transfer
// so useSendNativeToken, useSendGolemToken
// probably better to use wagmi hooks instead of own implementation

enum yagnaSupplyStatus {
  READY = 'READY',
  NATIVE_TRANSFERRING = 'NATIVE_TRANSFERRING',
  NATIVE_DONE = 'NATIVE_DONE',
  GLM_TRANSFERRING = 'GLM_TRANSFERRING',
  DONE = 'DONE',
}

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

export const useSupplyYagnaWallet = () => {
  const { wallet } = useMetaMask()

  const [txStatus, setTxStatus] = useState<yagnaSupplyStatus>(
    yagnaSupplyStatus.READY
  )

  const [account, setAccount] = useState(wallet.accounts[0])
  const [signer, setSigner] = useState<JsonRpcSigner>()
  new ethers.BrowserProvider(window.ethereum).getSigner(account).then(setSigner)

  useEffect(() => {
    const newAccount = wallet.accounts[0]
    setAccount(newAccount)
    new ethers.BrowserProvider(window.ethereum)
      .getSigner(newAccount)
      .then(setSigner)
  }, [wallet.accounts])

  const { yagnaAddress } = useSetup()

  if (!yagnaAddress) {
    throw new Error('Yagna address is not set')
  }

  const golemAddress = getContracts(getChainId()).GLM.address

  const send = async (amount: {
    [TokenCategory.GLM]: number
    [TokenCategory.NATIVE]: number
  }) => {
    if (!signer) {
      throw new Error('Signer is not set')
    }
    setTxStatus(yagnaSupplyStatus.NATIVE_TRANSFERRING)

    const nativeTransferTx = await sendNativeToken({
      balance: ethers.parseEther(amount[TokenCategory.NATIVE].toString()),
      signer,
      address: yagnaAddress,
    })

    await nativeTransferTx.wait()
    setTxStatus(yagnaSupplyStatus.NATIVE_DONE)

    const golemTransferTx = await sendGolemToken({
      balance: ethers.parseEther(amount[TokenCategory.GLM].toString()),
      signer,
      address: yagnaAddress,
      golemAddress,
    })

    await golemTransferTx.wait()
    setTxStatus(yagnaSupplyStatus.DONE)
  }

  return {
    send,
    txStatus,
  }
}
