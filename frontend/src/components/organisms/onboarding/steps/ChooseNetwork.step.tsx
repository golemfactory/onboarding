import { MouseEventHandler, useState, useEffect, useCallback } from 'react'
import { NetworkType } from 'types/ethereum'
import { Network } from 'ethereum/networks/types'
import { useSwitchNetwork } from 'wagmi'
import { useNetwork } from 'hooks/useNetwork'
import { useSetup } from 'hooks/useSetup'
import { TooltipProvider } from 'components/providers/Tooltip.provider'
import { RadioGroup } from 'components/molecules/radioGroup/RadioGroup'
import { EthereumIcon, MaticIcon } from 'components/atoms/icons'
import { Button, Trans } from 'components/atoms'
import { useOnboarding } from 'hooks/useOnboarding'
import { Commands } from 'state/commands'
import { hexToNumber } from 'viem/utils'
import { motion } from 'framer-motion'

TooltipProvider.registerTooltip({
  id: 'chooseNetwork',
  tooltip: {
    sections: ['explainPolygon', 'explainEthereum', 'explainCost'],
    appearance: 'primary',
  },
})

const ChooseNetworkPresentational = ({
  onConfirm,
  onNetworkSelection,
  selectedNetwork,
}: {
  onConfirm: MouseEventHandler
  onNetworkSelection: (network: NetworkType) => void
  selectedNetwork: NetworkType
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        transition: {
          delay: 1,
          duration: 1,
        },
      }}
      exit={{
        opacity: 0,
      }}
      className="flex flex-col"
    >
      <RadioGroup<NetworkType>
        onSelect={({ itemId }) => {
          onNetworkSelection(itemId)
        }}
        className="mt-4"
        items={[
          {
            label: (
              <div className="inline-flex flex-col items-start relative">
                <div className="text-body-extra-large flex">
                  Polygon <MaticIcon className="h-line-1 mt-1 ml-2" />{' '}
                </div>
                <div className="text-body-normal">
                  <Trans
                    i18nKey="polygon.description"
                    ns="chooseNetwork.step"
                  />
                </div>
                <span className="absolute -right-8 -top-2 inline-flex items-center rounded-full bg-success-50 px-2 py-1 text-body-small text-success-200">
                  <Trans
                    i18nKey="polygon.recommended"
                    ns="chooseNetwork.step"
                  />
                </span>
              </div>
            ),
            id: Network.POLYGON,
            checked: selectedNetwork === Network.POLYGON,
          },
          {
            label: (
              <div className="inline-flex flex-col items-start relative">
                <div className="text-body-extra-large flex">
                  Ethereum <EthereumIcon className="h-line-1 mt-1 ml-2" />{' '}
                </div>
              </div>
            ),
            id: Network.ETHEREUM,
            checked: selectedNetwork === Network.ETHEREUM,
          },
        ]}
      ></RadioGroup>
      <div>
        <Button
          buttonStyle="solid"
          className="mt-8 px-9 py-4 text-button-large"
          onClick={onConfirm}
        >
          <Trans i18nKey="confirmNetwork" ns="chooseNetwork.step" />
        </Button>
      </div>
    </motion.div>
  )
}

export const ChooseNetwork = () => {
  const [selectedNetwork, setSelectedNetwork] = useState<NetworkType>(
    Network.POLYGON
  )
  const { send } = useOnboarding()
  const { network: selectedNetworkFromParams } = useSetup()
  const { chain } = useNetwork()
  const { switchNetworkAsync } = useSwitchNetwork()

  const onConfirm = useCallback(async () => {
    if (chain?.id === selectedNetwork) {
      send(Commands.NEXT)
      return
    }
    await switchNetworkAsync?.(hexToNumber(selectedNetwork))
  }, [selectedNetwork, chain?.id])

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
      onNetworkSelection={setSelectedNetwork}
      selectedNetwork={selectedNetwork}
    />
  )
}
