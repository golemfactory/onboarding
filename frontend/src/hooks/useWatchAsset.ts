import { useState } from 'react'
import { EthereumAddress } from 'types/ethereum'
import { useWalletClient } from 'wagmi'

export const useWatchAsset = () => {
  const [success, setSuccess] = useState(false)

  const { data: client } = useWalletClient()

  const watch = async ({
    address,
    decimals,
    symbol,
  }: {
    address: EthereumAddress
    decimals: number
    symbol: string
  }) => {
    const result = await client?.watchAsset({
      type: 'ERC20',
      options: {
        address,
        symbol,
        decimals,
      },
    })
    setSuccess(!!result)
  }

  return {
    watch,
    success,
  }
}
