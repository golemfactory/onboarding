import { ProgressStage } from 'components/molecules'
import { OnboardingStage, OnboardingStageType } from 'state/stages'

export const YagnaStage = ({ stage }: { stage: OnboardingStageType }) => {
  const isCompleted = stage > OnboardingStage.YAGNA
  const isCurrent = stage === OnboardingStage.YAGNA
  return (
    <ProgressStage
      stage="yagna"
      isCompleted={isCompleted}
      isCurrent={isCurrent}
      index={3}
    />
  )
}
