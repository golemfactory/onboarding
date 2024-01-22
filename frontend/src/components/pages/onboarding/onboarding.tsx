import { getStepDetails } from 'state/getStepDetails'
import { useTheme } from 'components/providers/ThemeProvider'
import { useOnboarding } from 'hooks/useOnboarding'
import style from './onboarding.module.css'

export const OnboardingPage = () => {
  const theme = useTheme()

  const LayoutTemplate = theme.getLayoutTemplate()
  const StepTemplate = theme.getStepTemplate()

  const { state } = useOnboarding()
  //@ts-ignore
  const { name, component, placement } = getStepDetails(state.value)

  console.log('onboarding state', state)
  const Background = () => {
    return (
      <div className={style.container}>
        <div className={style.ellipse_1}></div>
        <div className={style.ellipse_2}></div>
        {/* <BulletCircle /> */}
      </div>
    )
  }
  return (
    <LayoutTemplate
      background={<Background />}
      main={
        <StepTemplate
          name={name}
          placement={placement}
          Component={component}
          checkCompleted={() => {
            return true
          }}
        />
      }
    ></LayoutTemplate>
  )
}
