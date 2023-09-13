import { createMachine } from 'xstate'
import { checkAccount, ensureMetamaskConnection, providerState } from './childMachines'
import { Steps } from './steps'
import { Commands } from './commands'
import type { OnboardingContextData } from 'types/dataContext'

export const createStateMachineWithContext = (context: OnboardingContextData) => {
  return createMachine<OnboardingContextData, { type: Commands.NEXT } | { type: Commands.PREVIOUS }>({
    context,
    id: 'onboarding',
    initial: Steps.CHECK_ACCOUNT,
    states: {
      [Steps.WALLET_INTRO]: {
        on: {
          [Commands.NEXT]: Steps.DETECT_METAMASK,
        },
      },
      [Steps.CHOOSE_NETWORK]: {
        on: {
          [Commands.NEXT]: Steps.CHECK_ACCOUNT,
        },
      },
      [Steps.ON_RAMP]: {
        on: {
          [Commands.NEXT]: Steps.WELCOME,
          [Commands.PREVIOUS]: Steps.CHOOSE_NETWORK,
        },
      },
      [Steps.WELCOME]: {
        on: {
          [Commands.NEXT]: Steps.WALLET_INTRO,
        },
      },
      [Steps.CONNECT_WALLET]: {
        on: {
          [Commands.NEXT]: Steps.DETECT_METAMASK,
        },
      },
      [Steps.CHECK_ACCOUNT]: {
        invoke: {
          id: 'check-account',
          src: checkAccount,
          onDone: [],
        },
      },
      [Steps.DETECT_METAMASK]: {
        invoke: {
          id: 'detect-metamask',
          src: ensureMetamaskConnection,
          onDone: [
            {
              target: Steps.CONNECT_WALLET_SUCCESS,
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
      [Steps.CONNECT_WALLET_SUCCESS]: {},
      [Steps.SHOW_METAMASK_LINK]: {},
    },
  })
}
