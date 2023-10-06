import { ProgressStage } from 'components/molecules'
import { formatEther } from 'ethers'
import { OnboardingStage, OnboardingStageType } from 'state/stages'
import { GolemIcon } from 'components/atoms/icons'
import { useGLMBalance } from 'hooks/useGLMBalance'

export const GLMStage = ({ stage }: { stage: OnboardingStageType }) => {
  const isCompleted = stage > OnboardingStage.GLM
  const isCurrent = stage === OnboardingStage.GLM
  const { balance } = useGLMBalance()
  const uncompletedMessage = 'Network utility token'

  // const completedMessage = `Current balance: ${parseFloat(
  //   formatEther(balance?.toString() || '0')
  // ).toFixed(2)}`

  return (
    <ProgressStage
      title="GLM"
      message={isCompleted ? 'dupa' : uncompletedMessage}
      isCompleted={isCompleted}
      isCurrent={isCurrent}
      index={<GolemIcon />}
    />
  )
}
