import { ethers } from 'ethers'
import { OnboardingContextDataInterface } from 'types/dataContext'
import { BalanceCase, BalanceCaseType } from 'types/path'
import { settings } from '../../settings'
import { TokenCategory } from 'types/ethereum'
import { getTokenByCategory } from 'utils/getTokenByNetwrok'

const balanceToNumber = (balance: bigint | undefined) =>
  Number(ethers.formatEther(balance || 0n))

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const checkAccountBalances = async (
  context: OnboardingContextDataInterface
): Promise<BalanceCaseType | undefined> => {
  //to make sure loader is not blinking

  delay(1000)

  if (context.balanceCase) {
    return context.balanceCase
  }

  if (!context.blockchain.chainId) {
    throw new Error('checkAccountBalances: blockchain is not connected')
  }

  const isBelowThresholdGLM =
    !context.blockchain.balance.GLM ||
    balanceToNumber(context.blockchain.balance.GLM) <
      settings.minimalBalance[
        getTokenByCategory(context.blockchain.chainId, TokenCategory.GLM)
      ]

  console.log('is below', isBelowThresholdGLM)

  const isBelowThresholdNative =
    !context.blockchain.balance.NATIVE ||
    balanceToNumber(context.blockchain.balance.NATIVE) <
      settings.minimalBalance[
        getTokenByCategory(context.blockchain.chainId, TokenCategory.NATIVE)
      ]

  console.log('is below', isBelowThresholdNative)

  console.log('contect', JSON.parse(JSON.stringify(context)))

  if (isBelowThresholdGLM && isBelowThresholdNative) {
    return BalanceCase.NO_GLM_NO_MATIC
  }

  if (isBelowThresholdGLM) {
    return BalanceCase.NO_GLM
  }

  if (isBelowThresholdNative) {
    return BalanceCase.NO_MATIC
  }

  return BalanceCase.BOTH
}
