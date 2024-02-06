import { StepType, Step } from './steps'

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

// for now stage is the same as step
// but it's better to have a separate type for it
// as we plan to provide more complex onboarding
// including gasless swap way to buy GLM and more

export const stepToStage = (step: StepType): OnboardingStageType => {
  switch (step) {
    case Step.WELCOME:
      return OnboardingStage.WELCOME
    case Step.CHOOSE_NETWORK:
      return OnboardingStage.NETWORK
    case Step.CONNECT_WALLET:
      return OnboardingStage.WALLET
    case Step.TRANSFER:
      return OnboardingStage.YAGNA
    case Step.ON_RAMP:
      return OnboardingStage.MATIC
    case Step.SWAP:
      return OnboardingStage.GLM

    case Step.FINISH:
      return OnboardingStage.FINISH
  }

  throw new Error('Invalid step')
}
