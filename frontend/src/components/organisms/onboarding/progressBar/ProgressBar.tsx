import { OnboardingStageType } from 'state/stages'
import style from '../Onboarding.module.css'
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
  console.log('ProgressBar.tsx: showYagnaStep:', stage)
  return (
    <div style={{ position: 'fixed', top: '40px' }}>
      <ol className={style.progressBarContainer}>
        <WalletStage stage={stage.value} />
        <MaticStage stage={stage.value} />
        <GLMStage stage={stage.value} />
        {showYagnaStep ? <YagnaStage stage={stage.value} /> : ''}
      </ol>
    </div>
  )
}
