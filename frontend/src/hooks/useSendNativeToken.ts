import debug from 'debug'
import { useState } from 'react'
import { EthereumAddress, TxStatus } from 'types/ethereum'

const log = debug('useSendNativeToken')

import { usePublicClient, useWalletClient } from 'wagmi'

export const useSendNativeToken = () => {
  //we do not need more detailed status for now
  const publicClient = usePublicClient()
  const { data: walletClient } = useWalletClient()
  const [status, setStatus] = useState<TxStatus>(TxStatus.READY)

  const send = async ({
    to,
    value,
  }: {
    to: EthereumAddress
    value: bigint
  }) => {
    //TODO remove  this asap its ugly cheat to make sure we proceed anyways
    // as sometime public client do not has proper transaction receipt
    setTimeout(() => {
      log('Setting status to success anyways')
      setStatus(TxStatus.PENDING)
    }, 20000)
    try {
      setStatus(TxStatus.PENDING)
      //this only waits for trnsaction to be send but we want to be sure it is included in block
      const hash = await walletClient?.sendTransaction({
        to,
        value,
      })
      log('Transaction hash: ', hash)

      if (!hash) {
        setStatus(TxStatus.ERROR)
        throw new Error('No hash returned from sendTransaction')
      }

      // wait for transaction to be included
      await publicClient?.waitForTransactionReceipt({
        hash,
      })
      log('Transaction included in block')
      setStatus(TxStatus.SUCCESS)
    } catch (err) {
      log('Error sending native transaction: ', err)
      setStatus(TxStatus.ERROR)
    }
  }

  return {
    send,
    status,
  }
}
