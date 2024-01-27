import { getStepDetails } from './getStepRenderDetails'
import { useTheme } from 'components/providers/ThemeProvider'
import { useOnboarding } from 'hooks/useOnboarding'
import style from './onboarding.module.css'

export const OnboardingPage = () => {
  const theme = useTheme()

  const LayoutTemplate = theme.getLayoutTemplate()
  const StepTemplate = theme.getStepTemplate()

  const { state } = useOnboarding()

  return (
    <LayoutTemplate
      main={
        <StepTemplate
          //@ts-ignore
          {...getStepDetails(state.value)}
          checkCompleted={() => {
            return true
          }}
        />
      }
    ></LayoutTemplate>
  )
}
