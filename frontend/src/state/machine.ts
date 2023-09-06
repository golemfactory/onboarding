import { createMachine } from 'xstate'
import { detectMetamask, providerState } from './childMachines/detectMetamask'
import { Steps } from './steps'
import { Commands } from './commands'
import type { OnboardingContextData } from 'types/dataContext'

export const createStateMachineWithContext = (
  context: OnboardingContextData
) => {
  return createMachine<
    OnboardingContextData,
    { type: Commands.NEXT } | { type: Commands.PREVIOUS }
  >({
    context,
    id: 'onboarding',
    initial: Steps.WELCOME,
    states: {
      [Steps.CHOOSE_NETWORK]: {},
      [Steps.ON_RAMP]: {
        on: {
          [Commands.NEXT]: Steps.WELCOME,
          [Commands.PREVIOUS]: Steps.CHOOSE_NETWORK,
        },
      },
      [Steps.WELCOME]: {
        entry: () => {
          console.log('Welcome', context)
        },
        on: {
          [Commands.NEXT]: Steps.CONNECT_WALLET,
          // [Commands.PREVIOUS]: Steps.CONNECT_WALLET_SUCCESS,
        },
      },
      [Steps.CONNECT_WALLET]: {
        on: {
          [Commands.NEXT]: Steps.DETECT_METAMASK,
        },
      },
      // [Steps.CHECK_ACCOUNT]: {},
      [Steps.DETECT_METAMASK]: {
        invoke: {
          id: 'detect-metamask',
          src: detectMetamask,
          onDone: [
            {
              target: Steps.CONNECT_WALLET_SUCCESS,
              cond: (context, event) => event.data === providerState.METAMASK,
            },
            {
              target: Steps.SHOW_METAMASK_LINK,
              cond: (context, event) =>
                event.data === providerState.NO_PROVIDER,
            },
          ],
        },
      },
      [Steps.CONNECT_WALLET_SUCCESS]: {},
      [Steps.SHOW_METAMASK_LINK]: {},
    },
  })
}
