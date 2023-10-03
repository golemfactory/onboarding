export const OnboardingStage = {
  WELCOME: 1,
  WALLET: 2,
  MATIC: 3,
  GLM: 4,
  YAGNA: 5,
  FINISH: 1000,
} as const

export type OnboardingStageType =
  (typeof OnboardingStage)[keyof typeof OnboardingStage]
