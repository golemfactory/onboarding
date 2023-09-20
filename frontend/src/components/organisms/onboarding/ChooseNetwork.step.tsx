import { motion } from 'framer-motion'
import { MouseEventHandler, ChangeEventHandler, ChangeEvent, useState } from 'react'
import { networks } from 'ethereum/networks'
import { Network, NetworkType } from 'types/ethereum'
import { useSDK } from '@metamask/sdk-react'

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
  const { sdk } = useSDK()
  const [chainId, setChainId] = useState(sdk?.activeProvider?.chainId || undefined)

  //@ts-ignore

  sdk?.activeProvider?.on('chainChanged', (chainId: string) => {
    setChainId(chainId)
  })

  return (
    <div className="text-center">
      <motion.h1 className="text-4xl font-bold mb-4 text-gray-800" variants={variants}>
        Metamask is connected
      </motion.h1>
      <motion.p className="max-w-md text-gray-600 my-4 text-lg" variants={variants}>
        Thats great, now choose network
      </motion.p>

      <motion.select onChange={onNetworkSelection} variants={variants} value={chainId}>
        {Object.keys(networks).map((network) => {
          console.log('network', network)
          return (
            <option key={network} value={network}>
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

export const ChooseNetwork = ({ goToNextStep }: { goToNextStep: MouseEventHandler }) => {
  const onNetworkSelection = (e: ChangeEvent<HTMLSelectElement> & { target: { value: NetworkType } }) => {
    const network = e.target.value

    if (!(network === Network.MUMBAI || network === Network.POLYGON)) {
      throw new Error('Network not found')
    }

    window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: networks[network].chainId }],
    })
  }

  return <ChooseNetworkPresentational onConfirm={goToNextStep} onNetworkSelection={onNetworkSelection} />
}
