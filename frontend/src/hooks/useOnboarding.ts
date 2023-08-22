import { OnboardingContext } from 'components/providers'
import { useContext } from 'react'
import { useActor } from '@xstate/react'

export const useOnboarding = () => {
  const context = useContext(OnboardingContext)
  if (context === undefined) {
    throw new Error(
      'useOnboarding must be used within a "OnboardingContextProvider"'
    )
  }
  return useActor(context.service)
}
