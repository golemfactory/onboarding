//TODO : find better name

import { createMachine, interpret } from 'xstate'
import { Commands } from './commands'

export const categoryMachine = createMachine<
  any,
  { type: Commands.NEXT } | { type: Commands.PREVIOUS }
>({
  context: {},
  id: 'category',
  initial: 'welcome',
  states: {
    welcome: {
      on: {
        [Commands.NEXT]: 'wallet',
      },
      entry: () => {
        console.log('category machine wellcome entry')
      },
    },
    wallet: {
      on: {
        [Commands.NEXT]: 'matic',
      },
      entry: () => {
        console.log('category machine wallet entry')
      },
    },
    matic: {
      on: {
        [Commands.NEXT]: 'glm',
      },
      entry: () => {
        console.log('category machine glm entry')
      },
    },
    glm: {
      on: {
        [Commands.NEXT]: 'finish',
      },
    },
    finish: {
      type: 'final',
    },
  },
})

export const categoryMachineInstance = interpret(categoryMachine)
