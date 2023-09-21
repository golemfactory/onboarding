import { motion } from 'framer-motion'
import { MouseEventHandler, ChangeEventHandler, ChangeEvent, useState } from 'react'
import { networks } from 'ethereum/networks'
import { Network, NetworkType } from 'types/ethereum'
import { useMetaMask } from 'components/providers/MetamaskProvider'

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
  const metamask = useMetaMask()

  return (
    <div className="text-center">
      <motion.h1 className="text-4xl font-bold mb-4 text-white" variants={variants}>
        Metamask is connected
      </motion.h1>
      <motion.p className="max-w-md text-white my-4 text-xl" variants={variants}>
        Thats great, now choose network
      </motion.p>
      <motion.div variants={variants}>
        <select onChange={onNetworkSelection} value={selectedNetwork}>
          {Object.keys(networks).map((network) => {
            return (
              <option key={network} value={network}>
                {networks[network].chainName}
              </option>
            )
          })}
        </select>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          onClick={onConfirm}
        >
          Go
        </button>
      </motion.div>
    </div>
  )
}

export const ChooseNetwork = ({ goToNextStep }: { goToNextStep: () => {} }) => {
  const [selectedNetwork, setSelectedNetwork] = useState<NetworkType>(Network.MUMBAI)

  const onNetworkSelection = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedNetwork(e.target.value as NetworkType)
  }

  const onConfirm = async () => {
    await window.ethereum?.request({
      method: 'wallet_addEthereumChain',
      params: [networks[selectedNetwork]],
    })
    goToNextStep()
  }

  return (
    <ChooseNetworkPresentational
      onConfirm={(e) => {
        onConfirm()
      }}
      onNetworkSelection={onNetworkSelection}
      selectedNetwork={selectedNetwork}
    />
  )
}
