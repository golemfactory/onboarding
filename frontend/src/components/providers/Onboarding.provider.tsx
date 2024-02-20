import { PropsWithChildren, useEffect, useMemo, useRef, useState } from 'react'
import { createActorContext } from '@xstate/react'

import { useSetup } from './Setup.provider'
import { useNetwork } from 'hooks/useNetwork'
import { Commands } from 'state/commands'
import { useAccount } from 'hooks/useAccount'
import { useBalance } from 'hooks/useBalance'
import { createStateMachine } from 'state/machine'
import { useStep } from 'hooks/useStep'
import { useOnboarding, getOnboardingSnapshot } from 'hooks/useOnboarding'
import { EthereumAddress, NetworkType } from 'types/ethereum'
import { AnimatePresence, motion } from 'framer-motion'
import { Dialog } from 'components/molecules/networkChangeDialog/NetworkChangeDialog'
import { set } from 'lodash'

export const OnboardingContext = createActorContext(createStateMachine({}))

const ChainObserver = ({
  onUnexpectedChange,
  onBackToInitialSetup,
}: {
  onUnexpectedChange: () => void
  onBackToInitialSetup: () => void
}) => {
  // const { send } = useOnboarding()
  // const { chain } = useNetwork(false)
  // const { address } = useAccount(false)
  // const { state } = useOnboarding()
  // const balance = useBalance()
  // const initialChainRef = useRef<NetworkType | undefined>(chain?.id)
  // const initialAccountRef = useRef<EthereumAddress | undefined>(address)
  // useEffect(() => {
  //   console.log('chain changed', chain)

  //   const selectedNetwork = state.context.chosenNetwork
  //   const initialChain = initialChainRef.current
  //   const initialAccount = initialAccountRef.current

  //   const hasChainChanged = initialChain !== chain?.id
  //   const hasAccountChanged = initialAccount !== address
  //   console.log('se', selectedNetwork, hasChainChanged, hasAccountChanged)
  //   if (selectedNetwork) {
  //     if (hasChainChanged || hasAccountChanged) {
  //       onUnexpectedChange()
  //     }
  //     onBackToInitialSetup()
  //   }

  //   send({
  //     type: Commands.CHAIN_CONTEXT_CHANGED,
  //     payload: chain
  //       ? { chainId: chain?.id, address, balance }
  //       : { address, balance },
  //   })
  //   //values set once should never change
  //   if (!initialAccountRef.current && address) {
  //     initialAccountRef.current = address
  //   }
  //   if (!initialChainRef.current && chain?.id) {
  //     initialChainRef.current = chain?.id
  //   }
  // }, [address, chain?.id, balance.GLM, balance.NATIVE])

  return <></>
}

export const OnboardingProvider = ({ children }: PropsWithChildren) => {
  //read setup from url params
  const setup = useSetup()
  const step = useStep()
  const [displayNetworkChangeDialog, setDisplayNetworkChangeDialog] =
    useState(false)

  // const [initialChain, setInitialChain] = useState<NetworkType | undefined>(null)
  // const [initialAccount, setInitialAccount] = useState<EthereumAddress | undefined>(
  //   null
  // )

  const persistedSnapshot = getOnboardingSnapshot()

  //machine sholdnt be recreated on every render so we useMemo
  const machine = useMemo(
    () => createStateMachine({ ...setup, ...persistedSnapshot, step }),
    []
  )

  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  return (
    <OnboardingContext.Provider machine={machine}>
      <ChainObserver
        onUnexpectedChange={() => {
          setDisplayNetworkChangeDialog(true)
        }}
        onBackToInitialSetup={() => {
          setDisplayNetworkChangeDialog(false)
        }}
      />
      <Dialog
        isOpen={displayNetworkChangeDialog}
        onClose={() => {
          setDisplayNetworkChangeDialog(false)
        }}
      />
      {children}
    </OnboardingContext.Provider>
  )
}
