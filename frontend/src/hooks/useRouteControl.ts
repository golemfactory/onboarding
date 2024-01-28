import { useEffect } from 'react'
import { useOnboarding } from './useOnboarding'
import { stepPaths } from 'state/steps'
import { useNavigate } from 'react-router-dom'

export const useRouteControl = () => {
  const navigate = useNavigate()
  const { state } = useOnboarding()
  useEffect(() => {
    const stepPath = stepPaths[state.value as keyof typeof stepPaths]
    const path = window.location.hash
      .replace('#', '')
      .split('?')[0]
      .replace('/onboarding', '')
    const query = window.location.hash.replace('#', '').split('?')[1]
    const isStepPath = Object.values(stepPaths).includes(path)

    if (isStepPath && path !== stepPath) {
      navigate('/onboarding' + stepPath + (query ? '?' + query : ''))
    }
  }, [state.value]) // Depend on the current state and navigate function
}
