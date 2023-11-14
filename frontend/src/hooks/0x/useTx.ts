import { useNetwork } from 'hooks/useNetwork'
import { useCallback, useState } from 'react'
import {
  TPriceRequest,
  TQuoteRequest,
  TStatusRequest,
  TSubmitRequest,
} from './types'

function downloadJSON(data, filename) {
  var jsonContent = JSON.stringify(data)
  var blob = new Blob([jsonContent], { type: 'application/json' })
  var link = document.createElement('a')

  link.href = window.URL.createObjectURL(blob)
  link.download = filename

  // Append the link to the document
  document.body.appendChild(link)

  // Trigger the click event to start the download
  link.click()

  // Remove the link from the document
  document.body.removeChild(link)
}

import { fromHex } from 'viem'

const BASE_URL = 'https://api.0x.org'

const TXRELAY_BASE_URL = `${BASE_URL}/tx-relay/v1/swap`

const API_KEY = '7449543d-0be6-4a52-8e0f-fab70f6a0299'

const toStringValues = (
  obj: Record<string, string | number | boolean>
): Record<string, string> =>
  Object.entries(obj).reduce((acc, [key, value]) => {
    acc[key] = value.toString()
    return acc
  }, {} as Record<string, string>)

export const buildRequestParams = ({
  action,
  params,
  chainId,
}: (TPriceRequest | TStatusRequest | TSubmitRequest | TQuoteRequest) & {
  chainId: string
}) => {
  const headers = {
    '0x-api-key': API_KEY,
    //@ts-ignore
    '0x-chain-id': fromHex(chainId, 'number').toString(10),
  }

  switch (action) {
    case 'price':
    case 'quote': {
      const qs = new URLSearchParams(toStringValues(params)).toString()
      return {
        url: `${TXRELAY_BASE_URL}/${action}?${qs}`,
        headers,
      }
    }
    case 'submit':
      return {
        url: `${TXRELAY_BASE_URL}/${action}`,
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      }
    case 'status':
      return {
        url: `${TXRELAY_BASE_URL}/${action}/${params.hash}`,
        headers,
      }
  }
}

export const call0xApi = async function ({
  chain,
  ...input
}: (TPriceRequest | TStatusRequest | TSubmitRequest | TQuoteRequest) & {
  chain: { id: string }
}) {
  const { url, headers, body } = buildRequestParams({
    ...input,
    chainId: chain.id,
  })

  console.log(url)
  const apiResponse = await fetch(url, {
    method: body ? 'POST' : 'GET',
    headers,
    body,
  })

  if (apiResponse.status !== 200) {
    throw new Error(`Request to ${input.action} failed`)
  }
  const json = await apiResponse.json()

  return json
}

export function useTx(
  input: TPriceRequest | TStatusRequest | TSubmitRequest | TQuoteRequest
) {
  const { chain } = useNetwork()
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<unknown>(null)

  if (!chain) {
    throw new Error('Chain ID is undefined')
  }

  const fetchData = useCallback(() => {
    call0xApi({ ...input, chain })
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [input, chain])
  return { data, loading, error, call: fetchData }
}
