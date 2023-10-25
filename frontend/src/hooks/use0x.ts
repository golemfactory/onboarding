import { useNetwork } from 'hooks/useNetwork'
import { getContracts } from 'utils/getContracts'
import { useAccount } from './useAccount'

export const use0x = () => {
  //TODO move to env
  const apiKey = '7449543d-0be6-4a52-8e0f-fab70f6a0299'
  const { chain } = useNetwork()
  const { address } = useAccount()

  if (!address) {
    throw new Error('Address not found')
  }
  if (!chain) {
    throw new Error('Chain not found')
  }

  const sellToken = getContracts(chain.id).GLM.address
  const buyToken = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'

  const get0x = async () => {
    const url = new URL('https://api.0x.org/tx-relay/v1/swap/quote')

    // url.searchParams.append('sellToken', sellToken)
    // url.searchParams.append('buyToken', buyToken)
    // url.searchParams.append('sellAmount', '1000000000000000000')
    // url.searchParams.append('takerAddress', address)
    const response = await fetch(
      'https://api.0x.org/tx-relay/v1/swap/quote?buyToken=0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee&takerAddress=0x923E80e15ce84E753a5AE954Aa49dc50F5F12022&sellToken=0x0B220b82F3eA3B7F6d9A1D8ab58930C064A2b5Bf&sellAmount=1000000000000000000',
      {
        method: 'GET',
        headers: {
          '0x-api-key': apiKey,
          '0x-chain-id': '137',
        },
      }
    )
    const data = await response.json()
    console.log(data)
    return data
  }

  return { swap: get0x }
}
