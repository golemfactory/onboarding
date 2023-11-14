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

      log('before wait', publicClient)

      const interval = setInterval(() => {
        log('interval')
        publicClient.getTransactionReceipt({ hash }).then((receipt) => {
          log('receipt', receipt.status)
          if (receipt.status === 'success') {
            clearInterval(interval)
            log('clear interval')
          }
        })
      }, 1000)
      // wait for transaction to be included
      publicClient
        .waitForTransactionReceipt({
          hash,
        })
        .then(() => {
          log('Transaction included in block')
          setStatus(TxStatus.SUCCESS)
        })
        .catch(() => {
          log('Transaction not included in block')
          // setStatus(TxStatus.SUCCESS)
        })
        .finally(() => {
          log('Transaction status: ', status)
        })
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
