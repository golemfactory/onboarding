import { Token } from './types'

// Minimal balance is checked during onboarding
// if user is below the threshold, they are considered to have no balance in that token
// and forces to acquire some but we don't want to perform a swap for very low amounts
// like 0.000000000000000001 GLM that are missing to reach the threshold
// so we set a minimal swap amount

export const settings = {
  minimalBalance: {
    [Token.GLM_MUMBAI]: 10,
    [Token.MATIC_MUMBAI]: 0.1,
    [Token.GLM_POLYGON]: 10,
    [Token.MATIC_POLYGON]: 1,
    [Token.ETH_MAINNET]: 0.1,
    [Token.GLM_MAINNET]: 10,
  },
  minimalSwap: {
    [Token.MATIC_MUMBAI]: 3,
    [Token.MATIC_POLYGON]: 3,
    [Token.ETH_MAINNET]: 3,
  },
  hourCost: 0.45,
  feesPercentage: 0.2,
}
