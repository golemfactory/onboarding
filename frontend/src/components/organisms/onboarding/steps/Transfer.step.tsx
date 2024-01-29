import { TokenCategory, TxStatus } from 'types/ethereum'
import { settings } from 'settings'
import { getGLMToken } from 'utils/getGLMToken'
import { getNativeToken } from 'utils/getNativeToken'

import { useSupplyYagnaWallet } from 'hooks/useSupplyYagnaWallet'
import { useNetwork } from 'hooks/useNetwork'
import { useBalance } from 'hooks/useBalance'
import { TooltipProvider } from 'components/providers/Tooltip.provider'
import { AnimatePresence, motion } from 'framer-motion'
import { Button, Trans } from 'components/atoms'

TooltipProvider.registerTooltip({
  id: 'transfer',
  tooltip: {
    sections: [],
    appearance: 'primary',
  },
})

type Amount = {
  [TokenCategory.GLM]: number
  [TokenCategory.NATIVE]: number
}

const StartButton = ({
  onClick,
  show,
}: {
  show: boolean
  onClick: (show: boolean) => void
}) => {
  return (
    <AnimatePresence>
      <motion.div
        variants={{
          open: { opacity: 1 },
          closed: { opacity: 0 },
          initial: { opacity: 0 },
        }}
        initial="initial"
        animate={show ? 'closed' : 'open'}
        exit="closed"
        transition={{ duration: 4 }}
        className="w-full flex flex-col col-span-2 gap-4 mt-8"
      >
        <div className="flex w-full justify-center text-h4 text-primary">
          <Trans i18nKey="transferLabel" ns="transfer.step" />
        </div>
        <div className="flex w-full justify-center">
          <Button
            buttonStyle="solid"
            className="px-9 py-4 text-button-large"
            onClick={() => {
              onClick(true)
            }}
          >
            <Trans i18nKey="startButton" ns="transfer.step" />
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

const TransferPresentational = ({
  showContent,
  setShowContent,
}: {
  showContent: boolean
  setShowContent: (show: boolean) => void
}) => {
  return (
    <div className="col-span-11">
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0, scale: 0.01, height: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.01 }}
            transition={{ duration: 1, delay: 1 }}
            key={'label'}
          >
            DUDUDUDU
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!showContent && (
          <motion.div
            key={'startButton'}
            initial={{ opacity: 0, scale: 0.01 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.01 }}
            transition={{ duration: 1 }}
            // className="w-full flex flex-col col-span-2 gap-4 mt-8"
          >
            <div className="flex w-full justify-center text-h4 text-primary">
              <Trans i18nKey="transferLabel" ns="transfer.step" />
            </div>
            <div className="flex w-full justify-center">
              <Button
                buttonStyle="solid"
                className="px-9 py-4 text-button-large"
                onClick={() => {
                  setShowContent(true)
                }}
              >
                <Trans i18nKey="startButton" ns="transfer.step" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export const Transfer = () => {
  const balance = useBalance()
  const { send, txStatus } = useSupplyYagnaWallet()
  const [isLoading, setIsLoading] = useState(false)
  const { chain } = useNetwork()

  const [showContent, setShowContent] = useState(false)
  if (!chain?.id) {
    throw new Error('Chain not found')
  }
  useEffect(() => {
    //control button loading state s
    if (
      txStatus[TokenCategory.GLM] === TxStatus.PENDING ||
      txStatus[TokenCategory.NATIVE] === TxStatus.PENDING
    ) {
      setIsLoading(true)
    }
    //continue flow when both transactions are successful
    // if (
    //   txStatus[TokenCategory.GLM] === TxStatus.SUCCESS &&
    //   txStatus[TokenCategory.NATIVE] === TxStatus.SUCCESS
    // ) {
    //   goToNextStep()
    // }
  }, [
    txStatus,
    // goToNextStep
  ])

  const [amount, setAmount] = useState<Amount>({
    [TokenCategory.GLM]: settings.minimalBalance[getGLMToken(chain.id).symbol],
    [TokenCategory.NATIVE]: settings.minimalBalance[getNativeToken(chain.id)],
  })

  return (
    <TransferPresentational
      showContent={showContent}
      setShowContent={setShowContent}
    />
  )
}
