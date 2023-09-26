import { createMachine, assign } from 'xstate'
import {
  checkAccountBalances,
  ensureMetamaskConnection,
  providerState,
} from './childMachines'

import { Step } from './steps'
import { Commands } from './commands'
import type { OnboardingContextData } from 'types/dataContext'
import { BalanceCase } from 'types/path'

const move = (stage: string) =>
  assign({
    stage: () => {
      return stage
    },
  })
export const createStateMachineWithContext = (
  context: OnboardingContextData
) => {
  return createMachine<
    OnboardingContextData,
    { type: 'ADD_GLM' } | { type: Commands.NEXT } | { type: Commands.PREVIOUS }
  >({
    context,
    id: 'onboarding',
    initial: Step.WELCOME,
    states: {
      [Step.WELCOME]: {
        on: {
          [Commands.NEXT]: {
            target: Step.WALLET_INTRO,
            actions: move('wallet'),
          },
        },
      },

      [Step.WALLET_INTRO]: {
        on: {
          [Commands.NEXT]: {
            target: Step.DETECT_METAMASK,
            actions: move('matic'),
          },
        },
      },

      [Step.DETECT_METAMASK]: {
        invoke: {
          id: 'detect-metamask',
          src: ensureMetamaskConnection,
          onDone: [
            {
              target: Step.CHOOSE_NETWORK,
              cond: (_context, event) => event.data === providerState.METAMASK,
            },
            {
              target: Step.SHOW_METAMASK_LINK,
              cond: (_context, event) =>
                //TODO: handle another wallets
                event.data === providerState.NO_PROVIDER ||
                event.data === providerState.NOT_METAMASK,
            },
            {
              target: Step.CONNECT_WALLET,
              cond: (_context, event) =>
                event.data === providerState.NOT_CONNECTED,
            },
          ],
        },
      },
      [Step.SHOW_METAMASK_LINK]: {
        on: {
          [Commands.NEXT]: Step.CONNECT_WALLET,
        },
      },
      [Step.CONNECT_WALLET]: {
        on: {
          [Commands.NEXT]: Step.CHOOSE_NETWORK,
        },
      },
      [Step.CHOOSE_NETWORK]: {
        on: {
          [Commands.NEXT]: context.skipSteps?.includes(Step.ADD_GLM)
            ? Step.CHECK_ACCOUNT_BALANCES
            : Step.ADD_GLM,
        },
      },
      [Step.ADD_GLM]: {
        on: {
          [Commands.NEXT]: Step.CHECK_ACCOUNT_BALANCES,
        },
      },

      [Step.CHECK_ACCOUNT_BALANCES]: {
        invoke: {
          id: 'check-account',
          src: checkAccountBalances,
          onDone: [
            {
              target: Step.SWAP,
              cond: (_context, event) => {
                return event.data === BalanceCase.NO_GLM
              },
              actions: move('glm'),
            },
            {
              target: Step.ON_RAMP,
              cond: (_context, event) => {
                return event.data === BalanceCase.NO_GLM_NO_MATIC
              },
              actions: move('matic'),
            },
            {
              target: Step.FINISH,
              cond: (_context, event) => {
                return event.data === BalanceCase.BOTH
              },
            },
            {
              target: Step.GASLESS_SWAP,
              cond: (_context, event) => {
                return event.data === BalanceCase.NO_MATIC
              },
              actions: move('matic'),
            },
          ],
        },
      },

      [Step.ON_RAMP]: {
        on: {
          [Commands.NEXT]: Step.CHECK_ACCOUNT_BALANCES,
        },
      },
      [Step.GASLESS_SWAP]: {
        on: {
          [Commands.NEXT]: Step.ON_RAMP,
        },
      },
      [Step.SWAP]: {
        on: {
          [Commands.NEXT]: {
            target: Step.FINISH,
            actions: move('final'),
          },
        },
      },
      [Step.FINISH]: {
        // entry: () => {
        //   assign({
        //     stage: 'final',
        //   })
        // },
      },
    },
  })
}
