import { NO_CONNECTED_ACCOUNT_ERROR } from 'hooks/useAccount'
import { match } from 'ts-pattern'
import { Button } from '..'
import { useNavigate } from 'react-router-dom'

const NoChainErrorBoundary = () => {
  const navigate = useNavigate()
  return (
    <div className="flex items-center justify-center min-h-screen bg-primary opacity-80">
      <div className="w-96 h-64 bg-white p-8 rounded-lg shadow-md">
        <p className="text-2xl text-primary font-body-normal mb-4">
          You cant use this feature without a connected chain.
        </p>
        <div className="flex gap-4 items-center">
          <w3m-button /> or{' '}
          <Button
            buttonStyle="solid"
            className="py-2 px-4 rounded-full "
            onClick={() => navigate('/')}
          >
            {' '}
            Go to landing{' '}
          </Button>
        </div>
      </div>
    </div>
  )
}

const DefaultErrorBoundary = ({ errorText }: { errorText: string }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-golemblue opacity-80">
      <div className="w-96 h-64 bg-white p-8 rounded-lg shadow-md">
        <p className="text-2xl text-red-500 font-semibold mb-4">
          Something went wrong:
        </p>
        <p
          className="text-lg text-red-700"
          style={{
            wordWrap: 'break-word',
            maxWidth: '100%',
          }}
        >
          {errorText}
        </p>
      </div>
    </div>
  )
}

export const ErrorBoundary = (props: { error: Error }) => {
  const error = props.error
  //@ts-ignore

  const errorText = error.message

  return (
    <>
      {match(error.message)
        .with(NO_CONNECTED_ACCOUNT_ERROR, () => <NoChainErrorBoundary />)
        .otherwise(() => (
          <DefaultErrorBoundary errorText={errorText} />
        ))}
    </>
  )
}
