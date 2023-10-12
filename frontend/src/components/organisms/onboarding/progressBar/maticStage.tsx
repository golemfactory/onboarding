import { ProgressStage } from 'components/molecules'
import { OnboardingStageType, OnboardingStage } from 'state/stages'
import { MaticIcon } from 'components/atoms/icons'
import { useBalance } from 'hooks/useBalance'
import { formatEther } from 'utils/formatEther'

export const MaticStage = ({ stage }: { stage: OnboardingStageType }) => {
  const isCompleted = stage > OnboardingStage.MATIC
  const isCurrent = stage === OnboardingStage.MATIC
  const balance = useBalance()

  const message =
    balance.NATIVE === undefined
      ? 'Native token for gas'
      : `Balance: ${formatEther({ wei: balance.NATIVE, precision: 4 })}`

  return (
    <ProgressStage
      title="Matic"
      message={message}
      isCompleted={isCompleted}
      isCurrent={isCurrent}
      index={<MaticIcon />}
    />
  )
}
