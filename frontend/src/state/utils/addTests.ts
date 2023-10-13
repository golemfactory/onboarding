import { EventObject, StateSchema, StatesConfig } from 'xstate/lib/types'

export const addTests = <
  TContext,
  TStateSchema extends StateSchema<any>,
  TEvents extends EventObject
>(
  states: StatesConfig<TContext, TStateSchema, TEvents>
): StatesConfig<TContext, TStateSchema, TEvents> => states
