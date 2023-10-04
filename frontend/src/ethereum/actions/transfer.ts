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
import { TokenCategory, TxStatus } from 'types/ethereum'

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

//TODO : use hooks here so we can better track status of the transfer
// so useSendNativeToken, useSendGolemToken
// probably better to use wagmi hooks instead of own implementation

type yagnaSupplyStatus = {
  [TokenCategory.GLM]: TxStatus
  [TokenCategory.NATIVE]: TxStatus
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

  const [txStatus, setTxStatus] = useState<yagnaSupplyStatus>({
    [TokenCategory.GLM]: TxStatus.READY,
    [TokenCategory.NATIVE]: TxStatus.READY,
  })

  const [account, setAccount] = useState(wallet.accounts[0])

  useEffect(() => {
    const newAccount = wallet.accounts[0]
    setAccount(newAccount)
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
    const signer = await new ethers.BrowserProvider(window.ethereum).getSigner(
      account
    )

    if (!signer) {
      throw new Error('Signer is not set')
    }

    const golemTransferTx = await sendGolemToken({
      balance: ethers.parseEther(amount[TokenCategory.GLM].toString()),
      signer,
      address: yagnaAddress,
      golemAddress,
    })

    setTxStatus((prev) => ({
      ...prev,
      [TokenCategory.GLM]: TxStatus.PENDING,
    }))

    await golemTransferTx.wait()

    setTxStatus((prev) => ({
      ...prev,
      [TokenCategory.GLM]: TxStatus.SUCCESS,
    }))

    const nativeTransferTx = await sendNativeToken({
      balance: ethers.parseEther(amount[TokenCategory.NATIVE].toString()),
      signer,
      address: yagnaAddress,
    })

    setTxStatus((prev) => ({
      ...prev,
      [TokenCategory.NATIVE]: TxStatus.PENDING,
    }))

    await nativeTransferTx.wait()

    setTxStatus((prev) => ({
      ...prev,
      [TokenCategory.NATIVE]: TxStatus.SUCCESS,
    }))

    await delay(1000)
    return
  }

  return {
    send,
    txStatus,
  }
}
