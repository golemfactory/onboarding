import { FC, ReactNode, createContext, useEffect, useState } from 'react'
import { useInterpret } from '@xstate/react'
import { InterpreterFrom } from 'xstate'
import { createStateMachineWithContext } from 'state/machine'
import { useSearchParams } from 'react-router-dom'

import { useSDK } from '@metamask/sdk-react'
import { LoadingSpinner } from 'components/atoms/loadingSpinner'

//TODO : provide better typing

export const OnboardingContext = createContext<{
  service: InterpreterFrom<any>
}>({
  //a little hack to make TS happy
  service: {} as InterpreterFrom<any>,
})

export const AwaitForMetamaskSDK: FC<{ children: ReactNode }> = ({ children }) => {
  const { connected } = useSDK()

  const [showLoading, setShowLoading] = useState(true)
  useEffect(() => {
    if (connected) {
      setTimeout(() => {
        setShowLoading(false)
      }, 2000)
    }
  }, [connected])

  if (!showLoading) {
    return <>{children}</>
  } else {
    return <LoadingSpinner />
  }
}

export const OnboardingProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  //TODO : make own hook for this to avoid calling get for every param

  const [queryParams] = useSearchParams()

  const yagnaWalletAddress = queryParams.get('yagnaWalletAddress') ?? ''
  const { sdk } = useSDK()

  const service = useInterpret(
    createStateMachineWithContext({
      yagnaWalletAddress,
      sdk,
    })
  )

  return (
    //@ts-ignore
    <OnboardingContext.Provider value={{ service }}>{children}</OnboardingContext.Provider>
  )
}
