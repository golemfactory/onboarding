import { createMachine, assign } from 'xstate'
import { checkAccountBalances } from './childMachines'

import { Step } from './steps'
import { Commands } from './commands'
import type {
  BlockchainContextData,
  OnboardingContextData,
  OnboardingContextDataInterface,
} from 'types/dataContext'
import { BalanceCase } from 'types/path'
import { OnboardingStage, OnboardingStageType } from './stages'

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

export const createStateMachineWithContext = (ctx: OnboardingContextData) => {
  console.log('creating machine with context', ctx)
  return createMachine<
    OnboardingContextDataInterface,
    | { type: 'ADD_GLM' }
    | { type: Commands.NEXT }
    | { type: Commands.PREVIOUS }

    //this event is used to communicate from blockchain related hooks
    //that transfer changes here so machine can keep needed data in context
    //this is far from ideal as it create two sources of truth
    //but wagmi do not provide any other way to do this
    | {
        type: Commands.CHAIN_CONTEXT_CHANGED
        payload: BlockchainContextData
      }
  >({
    context: {
      ...ctx,
      blockchain: {
        chainId: ctx.blockchain.chainId,
        //TODO : I would prefer getter here, check why it doesnt work
        isConnected() {
          return this.chainId !== undefined
        },
      },
    },
    id: 'onboarding',
    initial: ctx.initialStep || Step.CHOOSE_NETWORK,
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

    states: {
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
                return _context.blockchain.isConnected()
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
    },
  })
}
