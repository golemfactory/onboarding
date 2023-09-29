import { ProgressStage } from 'components/molecules'
import { useMetaMask } from 'hooks/useMetamask'
import { OnboardingStage, OnboardingStageType } from 'state/stages'

const accountShorthand = (account: string) => {
  return `${account.slice(0, 6)}...${account.slice(-4)}`
}

export const WalletStage = ({ stage }: { stage: OnboardingStageType }) => {
  const isCompleted = stage > OnboardingStage.WALLET
  const isCurrent = stage === OnboardingStage.WALLET
  const { wallet } = useMetaMask()
  const uncompletedMessage = 'You need to have a wallet installed'
  const completedMessage = `Address: ${accountShorthand(
    wallet.accounts[0] || ''
  )}`
  return (
    <ProgressStage
      title="Wallet"
      message={isCompleted ? completedMessage : uncompletedMessage}
      isCompleted={isCompleted}
      isCurrent={isCurrent}
      index={1}
    />
  )
}
