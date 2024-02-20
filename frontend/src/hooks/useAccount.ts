import { EthereumAddress, assertEthereumAddress } from 'types/ethereum'
import { useAccount as useAccountWagmi } from 'wagmi'

export const NO_CONNECTED_ACCOUNT_ERROR = 'No connected chain'

type GetAccountResult = ReturnType<typeof useAccountWagmi>

export const useAccount = (
  shouldThrow: boolean = true
): Omit<GetAccountResult, 'account'> & {
  address?: EthereumAddress
} => {
  const account = useAccountWagmi()
  const address = account.address

  if (address !== undefined) {
    assertEthereumAddress(address)
  }

  if (address === undefined && shouldThrow) {
    throw new Error(NO_CONNECTED_ACCOUNT_ERROR)
  }

  return {
    ...account,
    address,
  }
}
