export const BalanceCase = {
  // NO_ACCOUNT = 'no-account',
  NO_GLM: 'no-glm',
  NO_POL: 'no-pol',
  BOTH: 'both',
  NO_GLM_NO_POL: 'no-glm-no-pol',
} as const

export type BalanceCaseType = (typeof BalanceCase)[keyof typeof BalanceCase]
