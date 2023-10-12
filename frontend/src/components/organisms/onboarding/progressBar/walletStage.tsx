import { ProgressStage } from 'components/molecules'
import { OnboardingStage, OnboardingStageType } from 'state/stages'
import { faWallet } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAccount } from 'hooks/useAccount'

const accountShorthand = (account: string) => {
  return `${account.slice(0, 6)}...${account.slice(-4)}`
}

export const WalletStage = ({ stage }: { stage: OnboardingStageType }) => {
  const isCompleted = stage > OnboardingStage.WALLET
  const isCurrent = stage === OnboardingStage.WALLET

  const uncompletedMessage = 'You need to have a wallet installed'

  const { address } = useAccount()

  const completedMessage = `Address: ${accountShorthand(address || '')}`

  return (
    <ProgressStage
      title="Wallet"
      message={isCompleted ? completedMessage : uncompletedMessage}
      isCompleted={isCompleted}
      isCurrent={isCurrent}
      index={<FontAwesomeIcon icon={faWallet} />}
    />
  )
}
