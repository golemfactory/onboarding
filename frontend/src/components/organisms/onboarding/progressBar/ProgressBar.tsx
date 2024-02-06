import { OnboardingStageType } from 'state/stages'
import { GLMStage } from './glmStage'
import { MaticStage } from './maticStage'
import { YagnaStage } from './yagnaTransferStage'

export const ProgressBar = ({
  stage,
  showYagnaStep,
}: {
  stage: OnboardingStageType
  showYagnaStep?: boolean
}) => {
  console.log('stage', stage)
  return (
    <div className="col-span-3 border-r-1.5 border-lightblue-border pb-12 pt-10 pr-6 flex flex-col gap-6">
      <MaticStage stage={stage} />
      <GLMStage stage={stage} />
      {showYagnaStep ? <YagnaStage stage={stage} /> : ''}
    </div>
  )
}
