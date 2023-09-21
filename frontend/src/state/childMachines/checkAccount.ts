import { ethers } from 'ethers'
import { OnboardingContextData } from 'types/dataContext'
import { BalanceCase, BalanceCaseType } from 'types/path'
import { getBalances } from 'utils/getBalances'
import { settings } from '../../settings'
import { NativeTokenType, NetworkType, TokenCategory, UtilityTokenType } from 'types/ethereum'
import { getTokenByCategory } from 'utils/getTokenByNetwrok'
import { getChainId } from 'utils/getChain'

const balanceToNumber = (balance: bigint) => Number(ethers.formatEther(balance))

async function isBelowThresholdFactory(
  minimalBalance: Record<NativeTokenType | UtilityTokenType, number>,
  network: NetworkType
) {
  const balance = await getBalances()
  return function isBelowThreshold(tokenCategory: TokenCategory) {
    return balanceToNumber(balance[tokenCategory]) < minimalBalance[getTokenByCategory(network, tokenCategory)]
  }
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const checkAccountBalances = async (context: OnboardingContextData): Promise<BalanceCaseType | undefined> => {
  //to make sure loader is not blinking

  delay(1000)

  if (context.balanceCase) {
    return context.balanceCase
  }
  const isBelowThreshold = await isBelowThresholdFactory(settings.minimalBalance, getChainId())

  const isBelowThresholdGLM = isBelowThreshold(TokenCategory.GLM)
  const isBelowThresholdNative = isBelowThreshold(TokenCategory.NATIVE)

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
