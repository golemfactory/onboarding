import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
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
import { Dialog as NetworkChangeDialog } from 'components/molecules/networkChangeDialog/NetworkChangeDialog'

export const OnboardingContext = createActorContext(createStateMachine({}))

const ChainObserver = ({
  onUnexpectedChange,
  onBackToInitialSetup,
}: {
  onUnexpectedChange: () => void
  onBackToInitialSetup: () => void
}) => {
  const { send } = useOnboarding()
  const { chain } = useNetwork(false)
  const { address } = useAccount(false)
  const { state } = useOnboarding()
  const balance = useBalance()
  const selectedNetwork = state.context.chosenNetwork

  const initialChainRef = useRef<NetworkType | undefined>(selectedNetwork)
  const initialAccountRef = useRef<EthereumAddress | undefined>(address)

  useEffect(() => {
    initialChainRef.current = selectedNetwork
    initialAccountRef.current = address
  }, [selectedNetwork, address])

  useEffect(() => {
    const initialChain = initialChainRef.current
    const initialAccount = initialAccountRef.current
    console.log('chain observer', chain?.id, initialChain)

    const hasChainChanged = chain?.id && initialChain !== chain?.id
    const hasAccountChanged = initialAccount !== address
    console.log('chain observer', {
      hasChainChanged,
      hasAccountChanged,
      selectedNetwork,
    })
    if (selectedNetwork) {
      if (hasChainChanged || hasAccountChanged) {
        onUnexpectedChange()
      } else {
        onBackToInitialSetup()
      }
    }

    send({
      type: Commands.CHAIN_CONTEXT_CHANGED,
      payload: chain
        ? { chainId: chain?.id, address, balance }
        : { address, balance },
    })
    //values set once should never change
  }, [address, chain?.id, balance.GLM, balance.NATIVE])

  return <></>
}

export const OnboardingProvider = ({ children }: PropsWithChildren) => {
  //read setup from url params
  const setup = useSetup()
  const step = useStep()

  const [displayNetworkChangeDialog, setDisplayNetworkChangeDialog] =
    useState(false)

  console.log('step', displayNetworkChangeDialog)
  const onUnexpectedChange = useCallback(() => {
    console.log('unexpected change')
    setDisplayNetworkChangeDialog(true)
  }, [])
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
        onUnexpectedChange={onUnexpectedChange}
        onBackToInitialSetup={() => {
          setDisplayNetworkChangeDialog(false)
        }}
      />
      <NetworkChangeDialog
        isOpen={displayNetworkChangeDialog}
        onClose={() => {
          setDisplayNetworkChangeDialog(false)
        }}
      />
      {children}
    </OnboardingContext.Provider>
  )
}
