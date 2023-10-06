import { useBalance, useNetwork } from 'wagmi'
export const useGLMBalance = () => {
  const { chain, chains } = useNetwork()

  const { data, isError, isLoading } = useBalance({
    address: '0x2036807B0B3aaf5b1858EE822D0e111fDdac7018',
  })

  console.log('chain', chain, data)
  return {
    balance: data,
    isError,
    isLoading,
    chain,
    chains,
  }
}
