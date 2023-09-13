import { motion } from 'framer-motion'
import { OnboardingStep } from 'components/templates/OnboardingStep.template'
import { MouseEventHandler, ChangeEventHandler, ChangeEvent } from 'react'
import { useMetaMask } from 'hooks/useMetamask'
import { Network, networks } from 'ethereum/networks'
import { changeNetwork } from 'utils/changeNetwork'

const variants = {
  show: { opacity: 1 },
  hidden: { opacity: 0 },
}
const ChooseNetworkPresentational = ({
  onConfirm,
  onNetworkSelection,
}: {
  onConfirm: MouseEventHandler
  onNetworkSelection: ChangeEventHandler<HTMLSelectElement>
}) => {
  const { wallet } = useMetaMask()

  return (
    <div className="text-center">
      <motion.h1 className="text-4xl font-bold mb-4 text-gray-800" variants={variants}>
        Metamask is connected
      </motion.h1>
      <motion.p className="max-w-md text-gray-600 my-4 text-lg" variants={variants}>
        Thats great, now choose network
      </motion.p>

      <motion.select onChange={onNetworkSelection} variants={variants}>
        {Object.keys(networks).map((network) => {
          return (
            <option key={networks[network].chainId} value={network}>
              {networks[network].chainName}
            </option>
          )
        })}
      </motion.select>
      <motion.button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        variants={variants}
        onClick={onConfirm}
      >
        Go
      </motion.button>
    </div>
  )
}

export const ChooseNetwork = ({ onConfirm }: { onConfirm: MouseEventHandler }) => {
  const onNetworkSelection = (e: ChangeEvent<HTMLSelectElement> & { target: { value: Network } }) => {
    const network = e.target.value

    if (!(network === Network.MUMBAI || network === Network.POLYGON)) {
      throw new Error('Network not found')
    }
    changeNetwork(network)
  }

  return (
    <OnboardingStep>
      <ChooseNetworkPresentational onConfirm={onConfirm} onNetworkSelection={onNetworkSelection} />
    </OnboardingStep>
  )
}
