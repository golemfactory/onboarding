import { OnboardingContextData } from 'types/dataContext'
import { BalanceCase, BalanceCaseType } from 'types/path'
import { settings } from '../../settings'
import { TokenCategory } from 'types/ethereum'
import { getTokenByCategory } from 'utils/getTokenByNetwork'

export const checkAccountBalances = async (
  context: OnboardingContextData
): Promise<BalanceCaseType | undefined> => {
  //to make sure loader is not blinking
  if (context.balanceCase) {
    return context.balanceCase
  }

  if (!context.blockchain.chainId) {
    throw new Error('checkAccountBalances: blockchain is not connected')
  }

  const isBelowThresholdGLM =
    !context.blockchain.balance.GLM ||
    context.blockchain.balance.GLM <
      BigInt(
        settings.minimalBalance[
          getTokenByCategory(context.blockchain.chainId, TokenCategory.GLM)
        ]
      )

  const isBelowThresholdNative =
    !context.blockchain.balance.NATIVE ||
    context.blockchain.balance.NATIVE <
      BigInt(
        settings.minimalBalance[
          getTokenByCategory(context.blockchain.chainId, TokenCategory.NATIVE)
        ]
      )

  if (isBelowThresholdGLM && isBelowThresholdNative) {
    return BalanceCase.NO_GLM_NO_POL
  }

  if (isBelowThresholdGLM) {
    return BalanceCase.NO_GLM
  }

  if (isBelowThresholdNative) {
    return BalanceCase.NO_POL
  }

  return BalanceCase.BOTH
}
