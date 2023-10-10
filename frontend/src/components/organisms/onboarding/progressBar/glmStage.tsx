import { ProgressStage } from 'components/molecules'
import { OnboardingStage, OnboardingStageType } from 'state/stages'
import { GolemIcon } from 'components/atoms/icons'
import { useGLMBalance } from 'hooks/useGLMBalance'

export const GLMStage = ({ stage }: { stage: OnboardingStageType }) => {
  const isCompleted = stage > OnboardingStage.GLM
  const isCurrent = stage === OnboardingStage.GLM
  const { balance } = useGLMBalance()
  const formattedBalance = parseFloat(balance?.formatted || '').toFixed(2)
  const completedMessage = `Balance: ${formattedBalance}`

  const uncompletedMessage =
    balance?.value === BigInt(0) ? 'Network utility token' : completedMessage

  return (
    <ProgressStage
      title="GLM"
      message={isCompleted ? completedMessage : uncompletedMessage}
      isCompleted={isCompleted}
      isCurrent={isCurrent}
      index={<GolemIcon />}
    />
  )
}
