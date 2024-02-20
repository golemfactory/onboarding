import { PropsWithChildren, useEffect, useMemo } from 'react'
import { createActorContext } from '@xstate/react'

import { useSetup } from './Setup.provider'
import { useNetwork } from 'hooks/useNetwork'
import { Commands } from 'state/commands'
import { useAccount } from 'hooks/useAccount'
import { useBalance } from 'hooks/useBalance'
import { createStateMachine } from 'state/machine'
import { useStep } from 'hooks/useStep'
import { useOnboarding, useOnboardingSnapshot } from 'hooks/useOnboarding'

export const OnboardingContext = createActorContext(createStateMachine({}))

const ChainObserver = () => {
  const { send } = useOnboarding()
  const { chain } = useNetwork(false)
  const { address } = useAccount(false)
  const balance = useBalance()
  useEffect(() => {
    console.log('chain', chain)
    send({
      type: Commands.CHAIN_CONTEXT_CHANGED,
      payload: chain
        ? { chainId: chain?.id, address, balance }
        : { address, balance },
    })
  }, [address, chain?.id, balance.GLM, balance.NATIVE])

  return <></>
}

export const OnboardingProvider = ({ children }: PropsWithChildren) => {
  //read setup from url params
  const setup = useSetup()
  const step = useStep()

  const persistedSnapshot = useOnboardingSnapshot()

  //machine sholdnt be recreated on every render so we useMemo
  const machine = useMemo(
    () => createStateMachine({ ...setup, ...persistedSnapshot, step }),
    []
  )

  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  return (
    <OnboardingContext.Provider machine={machine}>
      <ChainObserver />
      {children}
    </OnboardingContext.Provider>
  )
}
