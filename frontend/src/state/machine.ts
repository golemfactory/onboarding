import { createMachine, assign } from 'xstate'
import { checkAccountBalances } from './childMachines'

import { Step, StepType } from './steps'
import { Commands } from './commands'
import {
  BudgetOption,
  type BlockchainContextData,
  type BudgetType,
  type OnboardingContextData,
} from 'types/dataContext'
import { BalanceCase } from 'types/path'
import { OnboardingStage, OnboardingStageType } from './stages'
import { EthereumAddress } from 'types/ethereum'

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

//initial step is persisted and passed to machine so
// it can be recovered after page reload
export const createStateMachine = (
  {
    step,
    yagnaAddress,
  }: {
    step?: StepType
    yagnaAddress?: EthereumAddress
  } = { step: Step.WELCOME }
) => {
  return createMachine<
    OnboardingContextData,
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
    | {
        type: Commands.SELECT_BUDGET
        payload: BudgetType
      }
  >({
    context: {
      yagnaAddress,
      blockchain: {
        chainId: undefined,
        balance: {
          GLM: BigInt(0),
          NATIVE: BigInt(0),
        },
        isConnected() {
          return this?.chainId !== undefined
        },
      },
      stage: OnboardingStage.MATIC,
      budget: BudgetOption.COMPUTE,
    },
    id: 'onboarding',
    initial: step || Step.WELCOME,
    on: {
      [Commands.SELECT_BUDGET]: {
        actions: assign({
          budget: (_context, event) => {
            return event.payload
          },
        }),
      },
      [Commands.CHAIN_CONTEXT_CHANGED]: {
        actions: assign({
          blockchain: (context, event) => {
            console.log('dupa ')
            return {
              ...context.blockchain,
              chainId: event.payload.chainId,
              address: event.payload.address,
              balance: event.payload.balance,
            }
          },
        }),
      },
    },

    states: {
      [Step.TRANSFER]: {
        entry: move(OnboardingStage.YAGNA),
        on: {
          [Commands.NEXT]: Step.FINISH,
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
        entry: [move(OnboardingStage.WALLET)],
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
              target: Step.TRANSFER,
              cond: (_context, event) => {
                return (
                  event.data === BalanceCase.BOTH && !!_context.yagnaAddress
                )
              },
              actions: move(OnboardingStage.YAGNA),
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
          [Commands.NEXT]: Step.CHECK_ACCOUNT_BALANCES,
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
