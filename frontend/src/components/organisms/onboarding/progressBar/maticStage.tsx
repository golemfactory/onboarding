import { ProgressStage } from 'components/molecules'
import { OnboardingStageType, OnboardingStage } from 'state/stages'

export const MaticStage = ({ stage }: { stage: OnboardingStageType }) => {
  const isCompleted = stage > OnboardingStage.MATIC
  const isCurrent = stage === OnboardingStage.MATIC
  return (
    <ProgressStage
      stage="Matic"
      isCompleted={isCompleted}
      isCurrent={isCurrent}
      index={1}
    />
  )
}
