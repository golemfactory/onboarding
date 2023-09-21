export const BalanceCase = {
  // NO_ACCOUNT = 'no-account',
  NO_GLM: 'no-glm',
  NO_MATIC: 'no-matic',
  BOTH: 'both',
  NO_GLM_NO_MATIC: 'no-glm-no-matic',
} as const

export type BalanceCaseType = (typeof BalanceCase)[keyof typeof BalanceCase]
