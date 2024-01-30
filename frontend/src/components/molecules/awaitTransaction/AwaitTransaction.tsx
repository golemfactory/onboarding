import { Trans } from 'components/atoms'
import { LoadingSpinner } from 'components/atoms/spinner/spinner'

export const AwaitTransaction = () => {
  return (
    <div className="flex flex-col items-center">
      <LoadingSpinner />
      <div className="text-h4 text-primary px-20 mt-4">
        <Trans i18nKey="awaitingTransaction" ns="layout" />
      </div>
    </div>
  )
}
