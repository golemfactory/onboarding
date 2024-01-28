import { useLocation } from 'react-router-dom'
import { StepType, stepPaths } from 'state/steps'

export const useStep = () => {
  const { pathname } = useLocation()
  console.log(pathname)
  return (Object.keys(stepPaths) as StepType[]).find((key) => {
    return (
      stepPaths[key as keyof typeof stepPaths] ===
      pathname.replace('/onboarding', '')
    )
  })
}
