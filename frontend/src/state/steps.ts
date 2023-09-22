export const SkippableStep = {
  WELCOME: 'welcome',
  ADD_GLM: 'add-glm',
  WALLET_INTRO: 'wallet-intro',
} as const

export const Step = {
  ...SkippableStep,
  FINISH: 'finish',
  CONNECT_WALLET: 'connect-wallet',
  DETECT_METAMASK: 'detect-metamask',
  SHOW_METAMASK_LINK: 'show-metamask-link',
  NOT_METAMASK: 'not-metamask',
  CONNECT_WALLET_SUCCESS: 'connect-wallet-success',
  CHOOSE_NETWORK: 'choose-network',
  ON_RAMP: 'on-ramp',
  CHECK_ACCOUNT_BALANCES: 'check-account-balances',
  SWAP: 'swap',
  GASLESS_SWAP: 'gasless-swap',
} as const

import _ from 'lodash'

export type SkippableStepType = (typeof SkippableStep)[keyof typeof SkippableStep]
export type StepType = (typeof Step)[keyof typeof Step]
