import { motion } from 'framer-motion'
import {
  MouseEventHandler,
  ChangeEventHandler,
  ChangeEvent,
  useState,
} from 'react'
import { networks } from 'ethereum/networks'
import { NetworkType } from 'types/ethereum'
import onboardingStyle from '../Onboarding.module.css'
import { Network } from 'ethereum/networks/types'
import { hexToNumber } from 'viem'
import { useSwitchNetwork } from 'wagmi'
import { useNetwork } from 'hooks/useNetwork'
const variants = {
  show: { opacity: 1 },
  hidden: { opacity: 0 },
}
const ChooseNetworkPresentational = ({
  onConfirm,
  onNetworkSelection,
  selectedNetwork,
}: {
  onConfirm: MouseEventHandler
  onNetworkSelection: ChangeEventHandler<HTMLSelectElement>
  selectedNetwork: NetworkType
}) => {
  return (
    <div className={onboardingStyle.step}>
      <motion.h1 className={onboardingStyle.title} variants={variants}>
        Wallet is connected
      </motion.h1>
      <motion.p className={onboardingStyle.description} variants={variants}>
        Now you need to choose network
      </motion.p>
      <motion.div variants={variants}>
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
    Network.MUMBAI
  )

  const { chain } = useNetwork()
  const { switchNetworkAsync } = useSwitchNetwork()

  const onNetworkSelection = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedNetwork(e.target.value as NetworkType)
  }

  const onConfirm = async () => {
    if (chain?.id === selectedNetwork) {
      goToNextStep()
      return
    }
    await switchNetworkAsync?.(hexToNumber(selectedNetwork))
    goToNextStep()
  }

  return (
    <ChooseNetworkPresentational
      onConfirm={() => {
        onConfirm()
      }}
      onNetworkSelection={onNetworkSelection}
      selectedNetwork={selectedNetwork}
    />
  )
}
