export const SkipableStep = {
  WELCOME: 'welcome',
  ADD_GLM: 'add-glm',
} as const

export const Step = {
  ...SkipableStep,
  FINISH: 'finish',
  CONNECT_WALLET: 'connect-wallet',
  CHOOSE_NETWORK: 'chooseNetwork',
  ON_RAMP: 'on-ramp',
  CHECK_ACCOUNT_BALANCES: 'check-account-balances',
  SWAP: 'swap',
  GASLESS_SWAP: 'gasless-swap',
  TRANSFER: 'transfer',
} as const

export type SkipableStepType = (typeof SkipableStep)[keyof typeof SkipableStep]
export type StepType = (typeof Step)[keyof typeof Step]

export const stepPaths: { [key in StepType]: string } = {
  [Step.WELCOME]: '/budget',
  [Step.CONNECT_WALLET]: '/connect-wallet',
  [Step.CHOOSE_NETWORK]: '/choose-network',
  [Step.ON_RAMP]: '/on-ramp',
  [Step.CHECK_ACCOUNT_BALANCES]: '/check-account-balances',
  [Step.SWAP]: '/swap',
  [Step.GASLESS_SWAP]: '/gasless-swap',
  [Step.FINISH]: '/finish',
  [Step.ADD_GLM]: '/add-glm',
  [Step.TRANSFER]: '/transfer',
} as const
