import { EthereumAddress, assertEthereumAddress } from 'types/ethereum'
import { useAccount as useAccountWagmi } from 'wagmi'

type GetAccountResult = ReturnType<typeof useAccountWagmi>

export const useAccount = (): Omit<GetAccountResult, 'account'> & {
  address: EthereumAddress
} => {
  const account = useAccountWagmi()

  const address = account.address
  assertEthereumAddress(address)

  return {
    ...account,
    address,
  }
}
