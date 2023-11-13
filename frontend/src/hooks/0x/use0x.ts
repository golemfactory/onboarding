import { useNetwork } from 'hooks/useNetwork'
import { useAccount } from '../useAccount'

import { secp256k1 } from '@noble/curves/secp256k1'
import { hexToNumber, numberToHex, verifyTypedData } from 'viem'
import { useState } from 'react'
import { set } from 'lodash'
import {
  AbiCoder,
  ethers,
  keccak256,
  recoverAddress,
  toUtf8Bytes,
} from 'ethers'

const decode = (signatureHex: unknown) => {
  //@ts-ignore
  const { r, s, v } = ethers.Signature.from(signatureHex)
  return { r, s, v }
}

// const verifyMessage = async ({ message, address, signature }: any) => {
//   try {
//     const signerAddr = await ethers.verifyMessage(message, signature)
//     if (signerAddr !== address) {
//       return false
//     }
//     return true
//   } catch (err) {
//     console.log(err)
//     return false
//   }
// }

export const use0x = () => {
  //TODO move to env
  const apiKey = '7449543d-0be6-4a52-8e0f-fab70f6a0299'
  const { chain } = useNetwork()
  const { address } = useAccount()

  const [approval, setApproval] = useState<unknown>()
  const [trade, setTrade] = useState<unknown>()
  const [data, setData] = useState<unknown>()
  if (!address) {
    throw new Error('Address not found')
  }
  if (!chain) {
    throw new Error('Chain not found')
  }

  const sellToken = '0x0B220b82F3eA3B7F6d9A1D8ab58930C064A2b5Bf'
  const buyToken = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'

  const get0x = async () => {
    const url = new URL('https://api.0x.org/tx-relay/v1/swap/quote')

    url.searchParams.append('sellToken', sellToken)
    url.searchParams.append('buyToken', buyToken)
    url.searchParams.append('sellAmount', '100000000000000000000')
    url.searchParams.append(
      'takerAddress',
      '0xF13dca74792AEd3467D6845F9e8D701Afcd40460'
    )
    url.searchParams.append('checkApproval', 'true')
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        '0x-api-key': apiKey,
        '0x-chain-id': '137',
      },
    })
    const data = await response.json()

    setData(data)

    const provider = new ethers.BrowserProvider(window.ethereum)

    const signer = await provider.getSigner(
      '0xF13dca74792AEd3467D6845F9e8D701Afcd40460'
    )

    const approvalEIP712 = {
      domain: data.approval.eip712.domain,
      types: {
        MetaTransaction: data.approval.eip712.types.MetaTransaction,
      },
      message: data.approval.eip712.message,
    }

    console.log('approvalEIP712', approvalEIP712)
    const approval = await signer.signTypedData(
      approvalEIP712.domain,
      approvalEIP712.types,
      approvalEIP712.message
    )

    const tradeEIP712 = {
      domain: data.trade.eip712.domain,
      types: {
        MetaTransactionDataV2: data.trade.eip712.types.MetaTransactionDataV2,
        MetaTransactionFeeData: data.trade.eip712.types.MetaTransactionFeeData,
      },
      message: data.trade.eip712.message,
    }

    console.log('tradeEIP712', tradeEIP712)
    const trade = await signer.signTypedData(
      data.trade.eip712.domain,
      tradeEIP712.types,
      tradeEIP712.message
    )

    console.log('sign', approval, trade)

    // const approval2 = await window.ethereum.request({
    //   method: 'eth_signTypedData_v4',
    //   params: [
    //     '0xf315467A9460C1B3d8b92d419177FD9130c563E5',
    //     data.approval.eip712,
    //   ],
    // })

    // const trade2 = await window.ethereum.request({
    //   method: 'eth_signTypedData_v4',
    //   params: ['0xf315467A9460C1B3d8b92d419177FD9130c563E5', data.trade.eip712],
    // })

    window.t = decode(trade)
    window.a = decode(approval)
    // window.t2 = decode(trade2)
    // window.a2 = decode(approval2)

    // verifyMessage({
    //   message: data.approval.eip712,
    //   address: '0xf315467A9460C1B3d8b92d419177FD9130c563E5',
    //   signature: approval,
    // })
    // console.log('tr', trade, decode(trade), trade2)
    // console.log('ap', approval, decode(approval), approval2)

    // const a = verifyTypedData({
    //   address: '0x33a7dBdf25C33CCb277E0C520152D16D12227297',
    //   domain: data.approval.eip712.domain,
    //   types: data.approval.eip712.types,
    //   message: data.approval.eip712.message,
    //   signature: approval as `0x${string}`,
    //   primaryType: 'Permit',
    // }).then((vericationResult) => {
    //   console.log('vericationResult', vericationResult)
    // })
    // console.log('A', a)
    setApproval(approval)
    setTrade(trade)

    return data
  }

  const swapSubmit = async () => {
    console.log('here', trade, approval)
    const url = new URL('https://api.0x.org/tx-relay/v1/swap/submit')
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        '0x-api-key': apiKey,
        '0x-chain-id': '137',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        trade: {
          type: 'metatransaction',
          eip712: data.trade.eip712,
          signature: { ...decode(trade), signatureType: 2 },
        },
        approval: {
          type: 'permit',
          eip712: data.approval.eip712,
          signature: { ...decode(approval), signatureType: 2 },
        },
      }),
    })
  }

  window

  return { swap: get0x, swapSubmit }
}
