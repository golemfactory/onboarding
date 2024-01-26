import { ProgressStage } from 'components/molecules'
import { OnboardingStage, OnboardingStageType } from 'state/stages'

export const GLMStage = ({ stage }: { stage: OnboardingStageType }) => {
  const isCompleted = stage > OnboardingStage.GLM
  const isCurrent = stage === OnboardingStage.GLM

  return (
    <ProgressStage
      stage="GLM"
      isCompleted={isCompleted}
      isCurrent={isCurrent}
      index={2}
    />
  )
}
