import { getStepDetails } from 'state/getStepDetails'
import { useTheme } from 'components/providers/ThemeProvider'
import { useOnboarding } from 'hooks/useOnboarding'

export const OnboardingPage = () => {
  const theme = useTheme()

  const LayoutTemplate = theme.getLayoutTemplate()
  const StepTemplate = theme.getStepTemplate()

  const [state] = useOnboarding()
  //@ts-ignore
  const { name, component } = getStepDetails(state.value)
  return (
    <LayoutTemplate
      main={<StepTemplate name={name} Component={component} />}
    ></LayoutTemplate>
  )
}
