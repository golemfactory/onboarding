import type { SignTypedDataArgs } from '@wagmi/core'
export type TPriceRequest = {
  action: 'price'
  params: {
    sellToken: string
    buyToken: string
    sellAmount: string
    takerAddress: string
    checkApproval?: boolean
    acceptedTypes?: string
    slippagePercentage?: number
  }
}

export type TQuoteRequest = {
  action: 'quote'
  params: {
    sellToken: string
    buyToken: string
    sellAmount: string
    takerAddress: string
    checkApproval?: boolean
    acceptedTypes?: string
    slippagePercentage?: number
  }
}

export type TSubmitRequest = {
  action: 'submit'
  params: {
    approval: any
    trade: any
  }
}

export type TStatusRequest = {
  action: 'status'
  params: {
    hash: string
  }
}

export type TSignableData = {
  eip712: {
    domain: object
    types: object
    message: object
  }
}
