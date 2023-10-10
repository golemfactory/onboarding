import { useState } from 'react'
import { EthereumAddress, TxStatus } from 'types/ethereum'

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

      if (!hash) {
        setStatus(TxStatus.ERROR)
        throw new Error('No hash returned from sendTransaction')
      }

      // wait for transaction to be included
      await publicClient?.waitForTransactionReceipt({
        hash,
      })
      setStatus(TxStatus.SUCCESS)
    } catch (err) {
      console.error(err)
      setStatus(TxStatus.ERROR)
    }
  }

  return {
    send,
    status,
  }
}
