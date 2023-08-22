import { FC, createContext } from 'react'
import { useInterpret } from '@xstate/react'
import { InterpreterFrom } from 'xstate'
import { onboardingMachine } from 'state/machine'

export const OnboardingContext = createContext<{
  service: InterpreterFrom<typeof onboardingMachine>
}>({
  //a little hack to make TS happy
  service: {} as InterpreterFrom<typeof onboardingMachine>,
})

export const OnboardingProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const service = useInterpret(onboardingMachine)

  return (
    <OnboardingContext.Provider value={{ service }}>
      {children}
    </OnboardingContext.Provider>
  )
}
