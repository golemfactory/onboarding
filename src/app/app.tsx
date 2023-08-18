import React, { FC, createContext } from 'react'
import { useInterpret } from '@xstate/react'

import { onboardingMachine } from 'state/machine'
import { OnboardingContainer } from 'components/organisms/onboarding/OnboardingContainer'
import { InterpreterFrom } from 'xstate'

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
const App = (): JSX.Element => {
  //For now we render only onboarding container
  //however in the future we will add more routes
  //that potentially will be depend on the onboarding state
  //that why provider is here
  //TODO : add router

  return (
    <OnboardingProvider>
      <OnboardingContainer />
    </OnboardingProvider>
  )
}

export default App
