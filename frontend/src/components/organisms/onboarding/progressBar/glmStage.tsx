import { ProgressStage } from 'components/molecules'
import { useMetaMask } from 'hooks/useMetamask'
import { OnboardingStage, OnboardingStageType } from 'state/stages'

export const GLMStage = ({ stage }: { stage: OnboardingStageType }) => {
  const isCompleted = stage > OnboardingStage.GLM
  const isCurrent = stage === OnboardingStage.GLM
  const { wallet } = useMetaMask()

  const uncompletedMessage = 'You need to acquire matic for gas'
  const completedMessage = `Current balance: ${wallet.balance.GLM}`
  return (
    <ProgressStage
      title="GLM"
      message={isCompleted ? completedMessage : uncompletedMessage}
      isCompleted={isCompleted}
      isCurrent={isCurrent}
      index={1}
    />
  )
}
