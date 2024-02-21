import { OnboardingContext } from 'components/providers'
import { useEffect } from 'react'
import { OnboardingContextData } from 'types/dataContext'
import { useSessionStorage } from 'usehooks-ts'

/**
 * Custom hook that persists a specific property from the OnboardingContextData in session storage.
 * @param property - The property to persist from the OnboardingContextData.
 * @returns The persisted value of the specified property.
 */

const usePersistOnboardingContext = (
  property: keyof Pick<
    OnboardingContextData,
    'budget' | 'boughtGLM' | 'boughtNative' | 'chosenNetwork'
  >
) => {
  const key = `onboarding-${property}`
  const [state] = OnboardingContext.useActor()
  const [value, setValue] = useSessionStorage(key, state.context[property])
  useEffect(() => {
    if (
      state.context[property] !== value &&
      state.context[property] !== undefined
    ) {
      setValue(state.context[property])
    }
  }, [state.context[property]])
  return value
}

export const useOnboarding = () => {
  const [state, send] = OnboardingContext.useActor()

  if (state === undefined) {
    throw new Error(
      'useOnboarding must be used within a "OnboardingContextProvider"'
    )
  }

  usePersistOnboardingContext('budget')
  usePersistOnboardingContext('boughtGLM')
  usePersistOnboardingContext('boughtNative')
  usePersistOnboardingContext('chosenNetwork')

  return {
    state,
    send,
  }
}

const getItem = (key: string, defaultVal: unknown) => {
  return JSON.parse(sessionStorage.getItem(key) || '""') || defaultVal
}

export const getOnboardingSnapshot = () => {
  return {
    budget: getItem('onboarding-budget', ''),
    boughtGLM: getItem('onboarding-boughtGLM', 0),
    boughtNative: getItem('onboarding-boughtNative', 0),
    chosenNetwork: getItem('onboarding-chosenNetwork', ''),
  }
}
