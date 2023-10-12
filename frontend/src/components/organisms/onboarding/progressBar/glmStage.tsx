import { ProgressStage } from 'components/molecules'
import { OnboardingStage, OnboardingStageType } from 'state/stages'
import { GolemIcon } from 'components/atoms/icons'
import { useBalance } from 'hooks/useBalance'
import { formatEther } from 'utils/formatEther'
export const GLMStage = ({ stage }: { stage: OnboardingStageType }) => {
  const isCompleted = stage > OnboardingStage.GLM
  const isCurrent = stage === OnboardingStage.GLM
  const balance = useBalance()

  const message =
    balance.GLM === undefined
      ? 'Network utility token'
      : `Balance: ${formatEther({ wei: balance.GLM, precision: 4 })}`

  return (
    <ProgressStage
      title="GLM"
      message={message}
      isCompleted={isCompleted}
      isCurrent={isCurrent}
      index={<GolemIcon />}
    />
  )
}
