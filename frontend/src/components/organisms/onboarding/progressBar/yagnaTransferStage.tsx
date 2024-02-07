import { ProgressStage } from 'components/molecules'
import { stat } from 'fs'
import { useOnboarding } from 'hooks/useOnboarding'
import { OnboardingStage, OnboardingStageType } from 'state/stages'

export const YagnaStage = ({ stage }: { stage: OnboardingStageType }) => {
  const isCompleted = stage > OnboardingStage.YAGNA
  const isCurrent = stage === OnboardingStage.YAGNA
  const { state } = useOnboarding()

  return (
    <ProgressStage
      stage="yagna"
      isCompleted={isCompleted}
      isCurrent={isCurrent}
      index={3}
      label={state?.context.yagnaAddress ? '' : 'Optional'}
    />
  )
}
