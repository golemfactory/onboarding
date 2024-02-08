import { OnboardingContext } from 'components/providers'
import { useEffect } from 'react'
import { OnboardingContextData, assertBudgetType } from 'types/dataContext'
import { useSessionStorage } from 'usehooks-ts'

const usePersistOnboardingContext = (
  property: keyof Pick<
    OnboardingContextData,
    'budget' | 'boughtGLM' | 'boughtNative'
  >
) => {
  const key = `onboarding-${property}`
  const [state] = OnboardingContext.useActor()
  const [value, setValue] = useSessionStorage(key, '')
  useEffect(() => {
    if (state.context[property] !== value) {
      //@ts-ignore
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

  return {
    state,
    send,
  }
}

//TODO : it doesnt need to be a hook

export const useOnboardingSnapshot = () => {
  const budgetItem = JSON.parse(
    localStorage.getItem('onboarding-budget') || '""'
  )

  if (budgetItem) {
    assertBudgetType(budgetItem)
  }
  //TODO [minor] : assert boughtGLM and boughtNative to be numbers
  return {
    budget: budgetItem,
    boughtGLM: Number(
      JSON.parse(localStorage.getItem('onboarding-boughtGLM') || '0')
    ),
    boughtNative: Number(
      JSON.parse(localStorage.getItem('onboarding-boughtNative') || '0')
    ),
  }
}
