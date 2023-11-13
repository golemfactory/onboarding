import { EthereumAddress } from 'types/ethereum'
import { useAccount } from '..'
import { TPriceRequest, TQuoteRequest } from './types'
import { useTx } from './useTx'

export const useGaslessSwap = function ({
  sellToken,
  buyToken,
  spendAmount,
}: {
  sellToken: EthereumAddress
  buyToken: EthereumAddress
  spendAmount: number
}) {
  const { address } = useAccount()

  if (!address) {
    throw new Error('No address')
  }

  const quoteParams: TQuoteRequest['params'] = {
    buyToken,
    sellToken,
    sellAmount: spendAmount.toString(),
    takerAddress: address,
    checkApproval: true,
    acceptedTypes: 'metatransaction_v2,otc',
    slippagePercentage: 0.03,
  }

  const { data, error, loading, call } = useTx({
    action: 'quote',
    params: quoteParams,
  })

  console.log('data', data)
  return {
    data,
    error,
    loading,
    call,
  }
}

export async function txRelayApprovalAndTrade(
  tokenToSpend: string,
  tokenToGet: string,
  spendAmount: string
) {
  console.log('Testing txRelay approval and trade:')
  console.log('--------------------------------------')
  // Price

  // await requestFromTxRelay({ action: 'price', params: priceParams })

  // Quote

  const quote = await requestFromTxRelay({
    action: 'quote',
    params: quoteParams,
  })
  const gaslessApproval =
    quote.approval?.isRequired && quote.approval?.isGaslessAvailable
  // Sign the approval and trade
  const approvalSig = gaslessApproval
    ? await signTypedData(
        quote.approval.eip712.domain,
        quote.approval.eip712.types,
        quote.approval.eip712.message
      )
    : null
  const tradeSig = await signTypedData(
    quote.trade.eip712.domain,
    quote.trade.eip712.types,
    quote.trade.eip712.message
  )

  // Submit
  const submitParams = {
    approval: gaslessApproval
      ? {
          ...quote.approval,
          signature: approvalSig,
        }
      : null,
    trade: {
      ...quote.trade,
      signature: tradeSig,
    },
  }
  const submit = await requestFromTxRelay({
    action: 'submit',
    params: submitParams,
  })
  console.log('Submit:', submit)

  // Wait for the tx to be mined
  let status = await requestFromTxRelay({
    action: 'status',
    params: { hash: submit.tradeHash },
  })
  console.log('Status:', status)
  while (status.status !== 'confirmed' && status.status !== 'failed') {
    await sleep(5000)
    status = await requestFromTxRelay({
      action: 'status',
      params: { hash: submit.tradeHash },
    })
    console.log('Status:', status)
  }

  if (status.status === 'failed') {
    console.log('Tx Relay approval and trade failed:', status)
    throw new Error(`Tx Relay approval and trade failed: ${status}`)
  }

  console.log('-----------------------------------------')
  console.log('--Tx Relay approval and trade succeeded--')
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
