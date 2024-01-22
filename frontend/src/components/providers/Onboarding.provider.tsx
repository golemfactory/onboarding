import { PropsWithChildren, useEffect, useMemo } from 'react'
import { createActorContext, useMachine } from '@xstate/react'

import { useSetup } from './Setup.provider'
import { useNetwork } from 'hooks/useNetwork'
import { Commands } from 'state/commands'
import { useAccount } from 'hooks/useAccount'
import { useBalance } from 'hooks/useBalance'
import { createStateMachine } from 'state/machine'

export const OnboardingContext = createActorContext(createStateMachine())

export const OnboardingProvider = ({ children }: PropsWithChildren) => {
  //read setup from url params
  const setup = useSetup()
  const { chain } = useNetwork()
  const { address } = useAccount()
  const balance = useBalance()
  //machine sholdnt be recreated on every render so we useMemo
  const machine = useMemo(() => createStateMachine(setup), [setup])

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_state, send] = useMachine(machine, { devTools: true })

  useEffect(() => {
    send({
      type: Commands.CHAIN_CONTEXT_CHANGED,
      payload: chain
        ? { chainId: chain.id, address, balance }
        : { address, balance },
    })
  }, [address, chain?.id, balance.GLM, balance.NATIVE])

  return (
    <OnboardingContext.Provider machine={machine}>
      {children}
    </OnboardingContext.Provider>
  )
}
