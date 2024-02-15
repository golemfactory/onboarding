import { PulsingDotLoader } from 'components/atoms/loadingSpinner'
import { FC, ReactElement, useEffect, useState } from 'react'

export const Loader = ({
  value,
  className,
  loader: Loader = PulsingDotLoader,
}: {
  value: ReactElement
  className?: string
  loader?: FC<{ className: string }>
}) => {
  const [isLoading, setIsLoading] = useState(true)

  //To make sure the loader is visible for at least 1 second
  useEffect(() => {
    setTimeout(() => {
      if (value) {
        setIsLoading(false)
      }
    }, 1000)
  }, [value])
  return (
    <div>
      {isLoading && <Loader className={className || ''} />}
      {!isLoading && value}
    </div>
  )
}
