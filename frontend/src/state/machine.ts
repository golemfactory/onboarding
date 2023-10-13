import { createMachine, assign } from 'xstate'
import { checkAccountBalances } from './childMachines'

import { Step } from './steps'
import { Commands } from './commands'
import type {
  OnboardingContextDataType,
  OnboardingEventsType,
} from 'types/dataContext'
import { BalanceCase } from 'types/path'
import { OnboardingStage, OnboardingStageType } from './stages'
import { addTests } from './utils/addTests'

const move = (stage: OnboardingStageType) =>
  assign({
    stage: () => {
      return stage
    },
  })

//TODO this should be known in context that comes from provider which should use proper hook

const isGLMTracked = () => {
  return JSON.parse(window.localStorage.getItem('onboarding') || '{}')
    .isGLMTracked
}

export const createStateMachineWithContext = (
  ctx: Omit<OnboardingContextDataType, 'blockchain.isConnected'>
) => {
  return createMachine<OnboardingContextDataType, OnboardingEventsType>({
    context: {
      ...ctx,
      blockchain: {
        chainId: ctx.blockchain.chainId,
        //TODO : I would prefer getter here, check why it doesn't work
        isConnected() {
          return this.chainId !== undefined
        },
      },
    },
    id: 'onboarding',
    initial: ctx.initialStep || Step.WELCOME,
    on: {
      [Commands.CHAIN_CONTEXT_CHANGED]: {
        actions: assign({
          blockchain: (context, event) => {
            return {
              ...context.blockchain,
              chainId: event.payload.chainId,
            }
          },
        }),
      },
    },

    states: addTests<OnboardingContextDataType, any, OnboardingEventsType>({
      [Step.TRANSFER]: {
        entry: move(OnboardingStage.YAGNA),
        on: {
          [Commands.NEXT]: Step.WELCOME,
        },
      },

      [Step.WELCOME]: {
        on: {
          [Commands.NEXT]: [
            {
              target: Step.CHOOSE_NETWORK,
              actions: move(OnboardingStage.WALLET),
              cond: (_context) => {
                return _context.blockchain?.isConnected()
              },
            },
            {
              target: Step.CONNECT_WALLET,
              actions: move(OnboardingStage.WALLET),
              cond: (_context) => {
                return !_context.blockchain.isConnected()
              },
            },
          ],
        },
      },

      [Step.CONNECT_WALLET]: {
        on: {
          [Commands.NEXT]: Step.CHOOSE_NETWORK,
        },
      },

      [Step.CHOOSE_NETWORK]: {
        entry: [move(OnboardingStage.NETWORK)],
        on: {
          [Commands.NEXT]: Step.CHECK_ACCOUNT_BALANCES,
        },
      },

      [Step.ADD_GLM]: {
        on: {
          [Commands.NEXT]: Step.SWAP,
        },
      },

      [Step.CHECK_ACCOUNT_BALANCES]: {
        invoke: {
          id: 'check-account',
          src: checkAccountBalances,
          onDone: [
            {
              target: Step.ADD_GLM,

              cond: (_context, event) => {
                return event.data === BalanceCase.NO_GLM && isGLMTracked()
              },
              actions: move(OnboardingStage.GLM),
            },
            {
              target: Step.SWAP,
              cond: (_context, event) => {
                return event.data === BalanceCase.NO_GLM && !isGLMTracked()
              },
              actions: move(OnboardingStage.GLM),
            },
            {
              target: Step.ON_RAMP,
              cond: (_context, event) => {
                return event.data === BalanceCase.NO_GLM_NO_MATIC
              },
              actions: move(OnboardingStage.MATIC),
            },
            {
              target: Step.FINISH,
              cond: (_context, event) => {
                return event.data === BalanceCase.BOTH
              },
              actions: move(OnboardingStage.FINISH),
            },
            {
              target: Step.GASLESS_SWAP,
              cond: (_context, event) => {
                return event.data === BalanceCase.NO_MATIC
              },
              actions: move(OnboardingStage.MATIC),
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
            actions: move(OnboardingStage.FINISH),
          },
        },
      },
      [Step.FINISH]: {
        entry: () => {
          move(OnboardingStage.FINISH)
        },
      },
    }),
  })
}
