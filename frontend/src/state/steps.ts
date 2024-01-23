export const SkipableStep = {
  WELCOME: 'welcome',
  ADD_GLM: 'add-glm',
} as const

export const Step = {
  ...SkipableStep,
  FINISH: 'finish',
  CONNECT_WALLET: 'connect-wallet',
  DETECT_METAMASK: 'detect-metamask',
  NOT_METAMASK: 'not-metamask',
  CONNECT_WALLET_SUCCESS: 'connect-wallet-success',
  CHOOSE_NETWORK: 'choose-network',
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
  [Step.CONNECT_WALLET_SUCCESS]: '/connect-wallet-success',
  [Step.DETECT_METAMASK]: '/detect-metamask',
  [Step.NOT_METAMASK]: '/not-metamask',
  [Step.CHOOSE_NETWORK]: '/choose-network',
  [Step.ON_RAMP]: '/on-ramp',
  [Step.CHECK_ACCOUNT_BALANCES]: '/check-account-balances',
  [Step.SWAP]: '/swap',
  [Step.GASLESS_SWAP]: '/gasless-swap',
  [Step.FINISH]: '/finish',
  [Step.ADD_GLM]: '/add-glm',
  [Step.TRANSFER]: '/transfer',
} as const
