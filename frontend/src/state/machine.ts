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
import { OnboardingStage, OnboardingStageType, stepToStage } from './stages'
import { EthereumAddress, NetworkType } from 'types/ethereum'

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

export const createStateMachine = ({
  step = Step.WELCOME,
  yagnaAddress,
  budget = BudgetOption.COMPUTE,
  boughtGLM = 0,
  boughtNative = 0,
}: {
  boughtGLM?: number
  boughtNative?: number
  budget?: BudgetType
  step?: StepType
  yagnaAddress?: EthereumAddress
}) => {
  return createMachine<
    OnboardingContextData,
    | { type: 'ADD_GLM' }
    | { type: Commands.NEXT }
    | { type: Commands.PREVIOUS }
    | { type: Commands.RESTART }
    | {
        type: Commands.CHAIN_CONTEXT_CHANGED
        payload: BlockchainContextData
      }
    | {
        type: Commands.SELECT_BUDGET
        payload: BudgetType
      }
    | {
        type: Commands.BUY_NATIVE
        payload: number
      }
    | {
        type: Commands.BUY_GLM
        payload: number
      }
    | { type: 'CHOOSE_NETWORK'; payload: NetworkType }
  >({
    context: {
      yagnaAddress,
      budget: budget || BudgetOption.COMPUTE,
      boughtNative,
      boughtGLM,
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
      stage: stepToStage(step),
    },
    id: 'onboarding',
    initial: step || Step.WELCOME,

    on: {
      [Commands.CHOOSE_NETWORK]: {
        actions: assign({
          chosenNetwork: (_context, event) => {
            return event.payload
          },
        }),
      },
      [Commands.RESTART]: {
        target: Step.WELCOME,
      },
      [Commands.BUY_NATIVE]: {
        actions: assign({
          boughtNative: (_context, event) => {
            return event.payload
          },
        }),
      },
      [Commands.BUY_GLM]: {
        actions: assign({
          boughtGLM: (_context, event) => {
            return event.payload
          },
        }),
      },
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
          [Commands.NEXT]: {
            target: Step.ON_RAMP,
            actions: move(OnboardingStage.MATIC),
          },
        },
      },

      [Step.ADD_GLM]: {
        on: {
          [Commands.NEXT]: Step.SWAP,
        },
      },

      //NOTE: for now as we redesigned onboarding
      //we do not need to check balances and always go through all steps
      //but we keep this code for future use when we will have more complex
      //process including gasless swap and more

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
          //IMPORTANT : TODO : should to check account balances
          [Commands.NEXT]: {
            target: Step.SWAP,
            actions: move(OnboardingStage.GLM),
          },
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
            target: Step.TRANSFER,
            actions: move(OnboardingStage.YAGNA),
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
