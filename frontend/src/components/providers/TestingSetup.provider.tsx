import { FC, createContext, useEffect, useState } from 'react'
import { useInterpret } from '@xstate/react'
import { InterpreterFrom } from 'xstate'
import { createStateMachineWithContext } from 'state/onBoardingMachine'

//TODO : provide better typing

export const TestingSetupContext = createContext<{
  service: InterpreterFrom<any>
}>({
  //a little hack to make TS happy
  service: {} as InterpreterFrom<any>,
})

export const TestingSetupProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const service = useInterpret(createStateMachineWithContext({}))

  return (
    //@ts-ignore
    <TestingSetupContext.Provider value={{ service }}>
      {children}
    </TestingSetupContext.Provider>
  )
}
