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
  if (!walletClient) throw new Error('No wallet client')

  const signMessage = useCallback(
    (data: SignTypedDataArgs) => {
      return walletClient.signTypedData(data)
    },
    [walletClient]
  )

  const glm = useGlm()
  const sellToken = glm.address
  //this is how 0x api handles native token
  const buyToken = NATIVE_TOKEN_ADDRESS

  const quoteParams: TQuoteRequest['params'] = useMemo(() => {
    return {
      buyToken,
      sellToken,
      sellAmount: '1000000000000000000',
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

    const approvalSig = await signMessage(quote.approval.eip712)
    const tradeSig = await signMessage(quote.trade.eip712)

    const isApprovalRequired =
      quote.approval?.isRequired && quote.approval?.isGaslessAvailable
    const oja = await call0xApi({
      action: 'submit',
      params: {
        approval: {
          type: quote.approval.type,
          eip712: quote.approval.eip712,
          //@ts-ignore
          signature: isApprovalRequired ? splitSignature(approvalSig) : null,
        },
        trade: {
          type: quote.trade.type,
          eip712: quote.trade.eip712,
          //@ts-ignore
          signature: splitSignature(tradeSig),
        },
      },
      chain,
    })
    console.log(oja)
    //sign the approval and trade
  }
  // const swap = useCallback(() => {
  //   call0xApi({ action: 'submit', params: quoteParams, chain })
  //     .then(setData)
  //     .catch(setError)
  // }, [quoteParams, chain])
  // const { data, call } = useTx({
  //   action: 'quote',
  //   params: quoteParams,
  // })

  // const { data, call } = useGaslessSwap({
  //   sellToken,
  //   buyToken,
  //   spendAmount: 1000000000000000000,
  // })

  return {
    swap,
  }
}
