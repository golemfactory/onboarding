import { motion } from 'framer-motion'
import {
  MouseEventHandler,
  ChangeEventHandler,
  ChangeEvent,
  useState,
} from 'react'
import { networks } from 'ethereum/networks'
import { NetworkType } from 'types/ethereum'
import { useMetaMask } from 'components/providers/Metamask.provider'
import onboardingStyle from '../Onboarding.module.css'
import { Network } from 'ethereum/networks/types'
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
        Metamask is connected
      </motion.h1>
      <motion.p className={onboardingStyle.description} variants={variants}>
        Thats great, now choose network
      </motion.p>
      <motion.div variants={variants}>
        <select onChange={onNetworkSelection} value={selectedNetwork}>
          {Object.keys(networks).map((network) => {
            const networkId = network as NetworkType
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
  const metamask = useMetaMask()
  const [selectedNetwork, setSelectedNetwork] = useState<NetworkType>(
    Network.MUMBAI
  )

  const onNetworkSelection = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedNetwork(e.target.value as NetworkType)
  }

  const onConfirm = async () => {
    if (metamask.wallet.chainId !== selectedNetwork) {
      try {
        await window.ethereum?.request({
          method: 'wallet_switchEthereumChain',
          params: [
            {
              chainId: selectedNetwork,
            },
          ],
        })
        goToNextStep()
      } catch (err) {
        if (err.code === 4902) {
          await window.ethereum?.request({
            method: 'wallet_addEthereumChain',
            params: [networks[selectedNetwork]],
          })
          goToNextStep()
        }
      }
    } else {
      goToNextStep()
    }
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
