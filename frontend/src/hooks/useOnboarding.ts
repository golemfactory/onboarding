import { OnboardingContext } from 'components/providers'

export const useOnboarding = () => {
  const [state, send] = OnboardingContext.useActor()

  if (state === undefined) {
    throw new Error(
      'useOnboarding must be used within a "OnboardingContextProvider"'
    )
  }
  return [state, send]
}
