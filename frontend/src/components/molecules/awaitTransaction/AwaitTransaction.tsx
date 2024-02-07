import { Trans } from 'components/atoms'
import { LoadingSpinner } from 'components/atoms/spinner/spinner'

export const AwaitTransaction = ({
  mode,
}: {
  mode: 'confirmation' | 'transaction'
}) => {
  return (
    <div className="flex flex-col items-center">
      <LoadingSpinner />
      <div className="text-h4 text-primary px-10 py-4 mt-4">
        {mode === 'confirmation' && (
          <Trans i18nKey="awaitingConfirmation" ns="layout" />
        )}
        {mode === 'transaction' && (
          <Trans i18nKey="awaitingTransaction" ns="layout" />
        )}
      </div>
    </div>
  )
}
