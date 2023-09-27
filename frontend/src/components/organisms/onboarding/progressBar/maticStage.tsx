import { ProgressStage } from 'components/molecules'
import { useMetaMask } from 'hooks/useMetamask'
import { OnboardingStageType, OnboardingStage } from 'state/stages'

export const MaticStage = ({ stage }: { stage: OnboardingStageType }) => {
  const isCompleted = stage > OnboardingStage.MATIC
  const isCurrent = stage === OnboardingStage.MATIC

  const { wallet } = useMetaMask()

  const uncompletedMessage = 'You need to acquire matic for gas'
  const completedMessage = `Current balance: ${wallet.balance.NATIVE}`
  return (
    <ProgressStage
      title="Matic"
      message={isCompleted ? completedMessage : uncompletedMessage}
      isCompleted={isCompleted}
      isCurrent={isCurrent}
      index={1}
    />
  )
}
