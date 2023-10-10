import { ProgressStage } from 'components/molecules'
import { OnboardingStageType, OnboardingStage } from 'state/stages'
import { MaticIcon } from 'components/atoms/icons'
import { useAccount, useBalance } from 'wagmi'

export const MaticStage = ({ stage }: { stage: OnboardingStageType }) => {
  const isCompleted = stage > OnboardingStage.MATIC
  const isCurrent = stage === OnboardingStage.MATIC
  const { address } = useAccount()
  const { data } = useBalance({
    address,
  })

  const formattedBalance = parseFloat(data?.formatted || '').toFixed(2)
  const completedMessage = `Balance: ${formattedBalance}`
  const uncompletedMessage =
    data?.value === BigInt(0) ? 'Network utility token' : completedMessage
  return (
    <ProgressStage
      title="Matic"
      message={isCompleted ? completedMessage : uncompletedMessage}
      isCompleted={isCompleted}
      isCurrent={isCurrent}
      index={<MaticIcon />}
    />
  )
}
