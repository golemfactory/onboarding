import { FC, createContext } from 'react'
import { useInterpret } from '@xstate/react'
import { InterpreterFrom } from 'xstate'
import { onboardingMachine } from 'state/machine'
import { QueryParamProvider } from 'use-query-params'
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6'
import { useQueryParams, StringParam } from 'use-query-params'
import { useSearchParams } from 'react-router-dom'

type OnboardingContextData = {
  yagnaWalletAddress: string
}

export const OnboardingContext = createContext<{
  service: InterpreterFrom<typeof onboardingMachine>
  data: OnboardingContextData
}>({
  //a little hack to make TS happy
  service: {} as InterpreterFrom<typeof onboardingMachine>,
  data: { yagnaWalletAddress: '' },
})

export const OnboardingProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const service = useInterpret(onboardingMachine)

  //TODO : make own hook for this to avoid calling get for every param
  const [queryParams] = useSearchParams()
  const yagnaWalletAddress = queryParams.get('yagnaWalletAddress') ?? ''

  return (
    <OnboardingContext.Provider
      value={{ service, data: { yagnaWalletAddress } }}
    >
      {children}
    </OnboardingContext.Provider>
  )
}
