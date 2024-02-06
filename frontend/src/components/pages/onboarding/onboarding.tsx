import { getStepDetails } from './getStepRenderDetails'
import { useTheme } from 'components/providers/ThemeProvider'
import { useOnboarding } from 'hooks/useOnboarding'
import { StepType } from 'state/steps'

export const OnboardingPage = () => {
  const theme = useTheme()
  const LayoutTemplate = theme.getLayoutTemplate()
  const { state } = useOnboarding()
  const StepComponent = getStepDetails(state.value as StepType)
  return (
    <>
      <LayoutTemplate>{StepComponent}</LayoutTemplate>
    </>
  )
}
