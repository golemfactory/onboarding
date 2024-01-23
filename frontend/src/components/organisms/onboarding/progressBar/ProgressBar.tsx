import { OnboardingStageType } from 'state/stages'
import { GLMStage } from './glmStage'
import { MaticStage } from './maticStage'
import { WalletStage } from './walletStage'
import { YagnaStage } from './yagnaTransferStage'
export const ProgressBar = ({
  stage,
  showYagnaStep,
}: {
  stage: { value: OnboardingStageType }
  showYagnaStep?: boolean
}) => {
  return (
    <div style={{ position: 'fixed', top: '40px' }}>
      <ol>
        <WalletStage stage={stage.value} />
        <MaticStage stage={stage.value} />
        <GLMStage stage={stage.value} />
        {showYagnaStep ? <YagnaStage stage={stage.value} /> : ''}
      </ol>
    </div>
  )
}
