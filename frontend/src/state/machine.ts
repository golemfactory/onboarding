import { createMachine, assign } from 'xstate'
import { checkAccountBalances, ensureMetamaskConnection, providerState } from './childMachines'
import { Steps } from './steps'
import { Commands } from './commands'
import type { OnboardingContextData } from 'types/dataContext'
import { BalanceCase } from 'types/path'

const addGLM = assign({
  glmAdded: true,
})

export const createStateMachineWithContext = (context: OnboardingContextData, initialStep?: Steps) => {
  return createMachine<
    OnboardingContextData,
    { type: 'ADD_GLM' } | { type: Commands.NEXT } | { type: Commands.PREVIOUS }
  >({
    context,
    id: 'onboarding',
    initial: Steps.CHECK_ACCOUNT_BALANCES,
    states: {
      [Steps.WELCOME]: {
        on: {
          [Commands.NEXT]: Steps.WALLET_INTRO,
        },
      },

      [Steps.WALLET_INTRO]: {
        on: {
          [Commands.NEXT]: Steps.DETECT_METAMASK,
        },
      },

      [Steps.DETECT_METAMASK]: {
        invoke: {
          id: 'detect-metamask',
          src: ensureMetamaskConnection,
          onDone: [
            {
              target: Steps.CHOOSE_NETWORK,
              cond: (context, event) => event.data === providerState.METAMASK,
            },
            {
              target: Steps.SHOW_METAMASK_LINK,
              cond: (context, event) =>
                //TODO: handle another wallets
                event.data === providerState.NO_PROVIDER || event.data === providerState.NOT_METAMASK,
            },
            {
              target: Steps.CONNECT_WALLET,
              cond: (context, event) => event.data === providerState.NOT_CONNECTED,
            },
          ],
        },
      },
      [Steps.SHOW_METAMASK_LINK]: {
        on: {
          [Commands.NEXT]: Steps.CONNECT_WALLET,
        },
      },
      [Steps.CONNECT_WALLET]: {
        on: {
          [Commands.NEXT]: Steps.CHOOSE_NETWORK,
        },
      },
      [Steps.CHOOSE_NETWORK]: {
        on: {
          [Commands.NEXT]: Steps.ADD_GLM,
        },
      },
      [Steps.ADD_GLM]: {
        on: {
          [Commands.NEXT]: Steps.CHECK_ACCOUNT_BALANCES,
        },
      },

      [Steps.CHECK_ACCOUNT_BALANCES]: {
        invoke: {
          id: 'check-account',
          src: checkAccountBalances,
          onDone: [
            {
              target: Steps.SWAP,
              cond: (context, event) => {
                return event.data === BalanceCase.NO_GLM
              },
            },
            {
              target: Steps.ON_RAMP,
              cond: (context, event) => {
                return event.data === BalanceCase.NO_GLM_NO_MATIC
              },
            },
            {
              target: Steps.FINISH,
              cond: (context, event) => {
                return event.data === BalanceCase.BOTH
              },
            },
            {
              target: Steps.GASLESS_SWAP,
              cond: (context, event) => {
                return event.data === BalanceCase.NO_MATIC
              },
            },
          ],
        },
      },

      [Steps.ON_RAMP]: {
        on: {
          [Commands.NEXT]: Steps.CHECK_ACCOUNT_BALANCES,
        },
      },
      [Steps.GASLESS_SWAP]: {
        on: {
          [Commands.NEXT]: Steps.ON_RAMP,
        },
      },
      [Steps.SWAP]: {
        on: {
          [Commands.NEXT]: Steps.FINISH,
        },
      },
      [Steps.FINISH]: {},
    },
  })
}
