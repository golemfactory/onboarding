import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { StepType, stepPaths } from 'state/steps'

export const useStep = () => {
  const { pathname } = useLocation()
  const [step, setStep] = useState<StepType>('welcome')

  useEffect(() => {
    const currentStep = (Object.keys(stepPaths) as StepType[]).find((key) => {
      return stepPaths[key as keyof typeof stepPaths] === pathname
    })
    if (currentStep) {
      setStep(currentStep)
    }
  }, [pathname])
  return step
}
