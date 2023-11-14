import { NATIVE_TOKEN_ADDRESS } from 'constants/0x'
import { useGlm } from './useGlm'
import { useAccount } from './useAccount'
import { call0xApi } from './0x/useTx'
import { TQuoteRequest } from './0x/types'
import { useCallback, useMemo } from 'react'
import { useNetwork } from './useNetwork'

import type { SignTypedDataArgs } from '@wagmi/core'
import { useWalletClient } from 'wagmi'
import { ethers } from 'ethers'

const splitSignature = (signatureHex: string) => {
  const { r, s, v } = ethers.Signature.from(signatureHex)
  return { r, s, v, signatureType: 2 }
}

export const useSwapGlmForGas = () => {
  //TODO : use Option/Result
  const { address } = useAccount()
  if (!address) throw new Error('No address')
  const { chain } = useNetwork()
  if (!chain) throw new Error('No chain')
  const { data: walletClient } = useWalletClient()

  console.log(walletClient)

  const signMessage = (data: SignTypedDataArgs) => {
    console.log('WTG', data)
    return walletClient?.signTypedData(data)
  }

  window.wc = walletClient
  const glm = useGlm()
  const sellToken = glm.address
  //this is how 0x api handles native token
  const buyToken = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'

  const quoteParams: TQuoteRequest['params'] = useMemo(() => {
    return {
      buyToken,
      sellToken,
      sellAmount: '10000000000000000000',
      takerAddress: address,
      checkApproval: true,
      acceptedTypes: 'metatransaction_v2,otc',
      slippagePercentage: 0.03,
    }
  }, [address, buyToken, sellToken])

  const getQuote = () => {
    return call0xApi({ action: 'quote', params: quoteParams, chain })
  }

  const swap = async () => {
    //get quote from 0x api
    const quote = await getQuote()

    console.log(quote)
    const approvalSig = quote.approval.isRequired
      ? await signMessage(quote.approval.eip712)
      : {}
    const tradeSig = await signMessage(quote.trade.eip712)

    const isApprovalRequired =
      quote.approval?.isRequired && quote.approval?.isGaslessAvailable
    await call0xApi({
      action: 'submit',
      params: {
        approval: isApprovalRequired
          ? {
              type: quote.approval.type,
              eip712: quote.approval.eip712,
              signature: isApprovalRequired
                ? splitSignature(approvalSig)
                : null,
            }
          : null,
        trade: {
          type: quote.trade.type,
          eip712: quote.trade.eip712,
          signature: splitSignature(tradeSig),
        },
      },
      chain,
    })
    //sign the approval and trade
  }
  // const swap = useCallback(() => {

  return {
    swap,
  }
}
