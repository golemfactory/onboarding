import { YagnaIcon } from 'components/atoms/icons'
import { ProgressStage } from 'components/molecules'
import { OnboardingStage, OnboardingStageType } from 'state/stages'

export const YagnaStage = ({ stage }: { stage: OnboardingStageType }) => {
  const isCompleted = stage > OnboardingStage.YAGNA
  const isCurrent = stage === OnboardingStage.YAGNA
  const message = 'supply yagna wallet'
  return (
    <ProgressStage
      title="Yagna"
      message={message}
      isCompleted={isCompleted}
      isCurrent={isCurrent}
      index={<YagnaIcon />}
    />
  )
}
