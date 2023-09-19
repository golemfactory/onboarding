import { useRouteError } from 'react-router-dom'

export const ErrorBoundary = () => {
  const error = useRouteError() as Error

  return (
    <div className="flex items-center justify-center min-h-screen bg-golemblue opacity-80">
      <div className="w-96 h-64 bg-white p-8 rounded-lg shadow-md">
        <p className="text-2xl text-red-500 font-semibold mb-4">Something went wrong:</p>
        <pre className="text-lg text-red-700">{error.message}</pre>
      </div>
    </div>
  )
}
