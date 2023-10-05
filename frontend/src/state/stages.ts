export const OnboardingStage = {
  WELCOME: 1,
  WALLET: 2,
  NETWORK: 3,
  MATIC: 4,
  GLM: 5,
  YAGNA: 6,
  FINISH: 1000,
} as const

export type OnboardingStageType =
  (typeof OnboardingStage)[keyof typeof OnboardingStage]
