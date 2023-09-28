import { ThemesManager } from '../../../../themes/ThemesManager'

export const Transfer = ({ goToNextStep }: { goToNextStep: () => void }) => {
  const StepTemaplate = ThemesManager.getInstance()
    .getActiveTheme()
    .getStepTemplate()

  return (
    <StepTemaplate
      onConfirm={goToNextStep}
      title={'Yagna wallet transfer'}
      buttonText={'Transfer'}
      content={'We will now transfer your funds to your Yagna wallet.'}
    />
  )
}
