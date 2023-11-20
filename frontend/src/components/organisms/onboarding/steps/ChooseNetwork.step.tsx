import { motion } from 'framer-motion'
import {
  MouseEventHandler,
  ChangeEventHandler,
  ChangeEvent,
  useState,
  useEffect,
  useCallback,
} from 'react'
import { networks } from 'ethereum/networks'
import { NetworkType } from 'types/ethereum'
import onboardingStyle from '../Onboarding.module.css'
import { Network } from 'ethereum/networks/types'
import { hexToNumber } from 'viem'
import { useSwitchNetwork } from 'wagmi'
import { useNetwork } from 'hooks/useNetwork'
import { useSetup } from 'hooks/useSetup'
import { hexToNetwork } from 'utils/hexToNetwork'
const variants = {
  show: { opacity: 1 },
  hidden: { opacity: 0 },
}
const ChooseNetworkPresentational = ({
  onConfirm,
  onNetworkSelection,
  selectedNetwork,
  allowNetworkSelection = true,
}: {
  onConfirm: MouseEventHandler
  onNetworkSelection: ChangeEventHandler<HTMLSelectElement>
  selectedNetwork: NetworkType
  allowNetworkSelection?: boolean
}) => {
  return (
    <div className={onboardingStyle.step}>
      <motion.h1 className={onboardingStyle.title} variants={variants}>
        Wallet is connected
      </motion.h1>
      <motion.p className={onboardingStyle.description} variants={variants}>
        {allowNetworkSelection
          ? 'Now you need to choose network'
          : `Connecting to ${hexToNetwork(selectedNetwork)}`}
      </motion.p>
      <motion.div variants={variants}>
        {allowNetworkSelection && (
          <div>
            <select onChange={onNetworkSelection} value={selectedNetwork}>
              {Object.keys(networks).map((network) => {
                const networkId = network as keyof typeof networks
                return (
                  <option key={networkId} value={networkId}>
                    {networks[networkId].chainName}
                  </option>
                )
              })}
            </select>
            <button
              className={onboardingStyle.button}
              style={{
                borderTopLeftRadius: '0',
                borderBottomLeftRadius: '0',
                height: '42px',
              }}
              onClick={onConfirm}
            >
              Go
            </button>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export const ChooseNetwork = ({
  goToNextStep,
}: {
  goToNextStep: () => void
}) => {
  const [selectedNetwork, setSelectedNetwork] = useState<NetworkType>(
    Network.POLYGON
  )

  const { network: selectedNetworkFromParams } = useSetup()

  const { chain } = useNetwork()
  const { switchNetworkAsync } = useSwitchNetwork()

  const onNetworkSelection = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedNetwork(e.target.value as NetworkType)
  }

  const onConfirm = useCallback(async () => {
    if (chain?.id === selectedNetwork) {
      goToNextStep()
      return
    }
    await switchNetworkAsync?.(hexToNumber(selectedNetwork))
    goToNextStep()
  }, [selectedNetwork, chain, switchNetworkAsync])

  useEffect(() => {
    if (selectedNetworkFromParams) {
      setSelectedNetwork(selectedNetworkFromParams)
      onConfirm()
    }
  }, [])

  return (
    <ChooseNetworkPresentational
      onConfirm={() => {
        onConfirm()
      }}
      onNetworkSelection={onNetworkSelection}
      selectedNetwork={selectedNetwork}
      allowNetworkSelection={!selectedNetworkFromParams}
    />
  )
}
