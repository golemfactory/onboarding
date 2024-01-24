import { getStepDetails } from './getStepRenderDetails'
import { useTheme } from 'components/providers/ThemeProvider'
import { useOnboarding } from 'hooks/useOnboarding'
import style from './onboarding.module.css'

export const OnboardingPage = () => {
  const theme = useTheme()

  const LayoutTemplate = theme.getLayoutTemplate()
  const StepTemplate = theme.getStepTemplate()

  const { state } = useOnboarding()
  const { name, main, placement, ornament, showNextButton } = getStepDetails(
    //@ts-ignore
    state.value
  )

  const Background = () => {
    return (
      <div className={style.container}>
        <div className={style.ellipse_1}></div>
        <div className={style.ellipse_2}></div>
      </div>
    )
  }

  console.log('name', name)
  return (
    <LayoutTemplate
      background={<Background />}
      main={
        <StepTemplate
          name={name}
          placement={placement}
          main={main}
          ornament={ornament}
          showNextButton={showNextButton}
          checkCompleted={() => {
            return true
          }}
        />
      }
    ></LayoutTemplate>
  )
}
