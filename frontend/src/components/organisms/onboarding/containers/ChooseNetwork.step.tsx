import { motion } from 'framer-motion'
import { MouseEventHandler, ChangeEventHandler, ChangeEvent, useState } from 'react'
import { networks } from 'ethereum/networks'
import { Network, NetworkType } from 'types/ethereum'
import { useMetaMask } from 'components/providers/MetamaskProvider'

export const ChooseNetwork = ({ goToNextStep }: { goToNextStep: () => {} }) => {
  const metamask = useMetaMask()
  const [selectedNetwork, setSelectedNetwork] = useState<NetworkType>(Network.MUMBAI)

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
      } catch (err) {
        console.log('err', err)
        if (err.code === 4902) {
          await window.ethereum?.request({
            method: 'wallet_addEthereumChain',
            params: [networks[selectedNetwork]],
          })
        }
      }
    }
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
