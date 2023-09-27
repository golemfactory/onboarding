import { OnboardingStageType } from 'state/stages'
import style from '../Onboarding.module.css'
import { GLMStage } from './glmStage'
import { MaticStage } from './maticStage'
import { WalletStage } from './walletStage'

export const ProgressBar = ({
  stage,
}: {
  stage: { value: OnboardingStageType }
}) => {
  console.log('stage', stage)
  return (
    <div style={{ position: 'fixed', top: '40px' }}>
      <ol className={style.progressBarContainer}>
        <WalletStage stage={stage.value} />
        <MaticStage stage={stage.value} />
        <GLMStage stage={stage.value} />
      </ol>
    </div>
  )
}
