import { createMachine } from 'xstate'
import { Steps } from './steps'
import { Commands } from './commands'

export const onboardingMachine = createMachine<
  {},
  { type: Commands.NEXT } | { type: Commands.PREVIOUS }
>({
  id: 'onboarding',
  initial: Steps.WELCOME,
  //  Temp imploementation for playing arround
  states: {
    [Steps.WELCOME]: {
      on: {
        [Commands.NEXT]: Steps.CONNECT_WALLET,
        [Commands.PREVIOUS]: Steps.CONNECT_WALLET_SUCCESS,
      },
    },
    [Steps.CONNECT_WALLET]: {
      on: {
        [Commands.NEXT]: Steps.CONNECT_WALLET_SUCCESS,
        [Commands.PREVIOUS]: Steps.WELCOME,
      },
    },
    [Steps.CONNECT_WALLET_SUCCESS]: {
      on: {
        [Commands.NEXT]: Steps.WELCOME,
        [Commands.PREVIOUS]: Steps.CONNECT_WALLET,
      },
    },
  },
})
