import { useRouteError } from 'react-router-dom'

export const ErrorBoundary = () => {
  const error = useRouteError() as any

  console.log('error', error)

  const errorText = error.message || error.data

  return (
    <div className="flex items-center justify-center min-h-screen bg-golemblue opacity-80">
      <div className="w-96 h-64 bg-white p-8 rounded-lg shadow-md">
        <p className="text-2xl text-red-500 font-semibold mb-4">Something went wrong:</p>
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
