import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { Trans } from 'components/atoms'

export const TransactionError = () => {
  return (
    <div className="flex flex-col items-center">
      <ExclamationCircleIcon className="h-8 w-8 mb-4 text-dangerred-200 inline" />

      <div className="text-h4 text-dangerred-200 px-8 pb-4 ">
        <Trans i18nKey="transactionError" ns="layout" />
      </div>
    </div>
  )
}
