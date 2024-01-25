import { useEffect } from 'react'
import { useOnboarding } from './useOnboarding'
import { stepPaths } from 'state/steps'
import { useNavigate } from 'react-router-dom'

export const useRouteControl = () => {
  const navigate = useNavigate()
  const { state } = useOnboarding()
  useEffect(() => {
    const path = stepPaths[state.value as keyof typeof stepPaths]
    if (path && path !== window.location.pathname) {
      navigate(path)
    }
  }, [state.value]) // Depend on the current state and navigate function
}
