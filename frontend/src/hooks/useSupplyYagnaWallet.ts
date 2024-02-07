import { TokenCategory } from 'types/ethereum'
import { useSendNativeToken } from './useSendNativeToken'
import { useSetup } from './useSetup'
import { parseEther } from 'viem'
import { useSendGLMs } from './useSendGLMs'

export const useSupplyYagnaWallet = () => {
  const { send: sendNative, status: nativeStatus } = useSendNativeToken()
  const { send: sendGolem, status: golemStatus } = useSendGLMs()

  const { yagnaAddress } = useSetup()

  if (!yagnaAddress) {
    return {
      send: () => void 0,
      txStatus: {
        [TokenCategory.GLM]: 'idle',
        [TokenCategory.NATIVE]: 'idle',
      },
    }
  }

  const send = async (amount: {
    [TokenCategory.GLM]: number
    [TokenCategory.NATIVE]: number
  }) => {
    try {
      await sendGolem({
        to: yagnaAddress,
        value: BigInt(parseEther(amount[TokenCategory.GLM].toString())),
      })

      await sendNative({
        to: yagnaAddress,
        value: BigInt(parseEther(amount[TokenCategory.NATIVE].toString())),
      })
    } catch (e) {}
  }

  return {
    send,
    txStatus: {
      [TokenCategory.GLM]: golemStatus,
      [TokenCategory.NATIVE]: nativeStatus,
    },
  }
}
