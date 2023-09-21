export const Step = {
  WELCOME: 'welcome',
  CONNECT_WALLET: 'connect-wallet',
  DETECT_METAMASK: 'detect-metamask',
  SHOW_METAMASK_LINK: 'show-metamask-link',
  NOT_METAMASK: 'not-metamask',
  CONNECT_WALLET_SUCCESS: 'connect-wallet-success',
  CHOOSE_NETWORK: 'choose-network',
  ON_RAMP: 'on-ramp',
  WALLET_INTRO: 'wallet-intro',
  CHECK_ACCOUNT_BALANCES: 'check-account-balances',
  SWAP: 'swap',
  GASLESS_SWAP: 'gasless-swap',
  FINISH: 'finish',
  ADD_GLM: 'add-glm',
} as const

export type StepType = (typeof Step)[keyof typeof Step]
