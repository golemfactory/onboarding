import {
  AccountCategory,
  WalletState,
} from 'components/molecules/walletState/walletState'
import { ProgressBar as ProgressBarPresentational } from 'components/organisms/onboarding/progressBar/ProgressBar'
import { useSetup } from 'components/providers'
import { useAccount } from 'hooks/useAccount'
import { useOnboarding } from 'hooks/useOnboarding'
import { useWallet } from 'hooks/useWallet'
import style from './StepWithProgress.module.css'
import {
  Children,
  PropsWithChildren,
  cloneElement,
  isValidElement,
  useEffect,
  useState,
} from 'react'
import { WalletsConnector } from 'components/atoms/ornaments/walletsConnector'
import { AnimatePresence, motion } from 'framer-motion'

const ProgressBar = () => {
  const { state } = useOnboarding()
  return (
    <ProgressBarPresentational
      stage={state.context.stage}
      showYagnaStep={!!state.context.yagnaAddress || true}
    />
  )
}

export const StepWithProgress = ({
  children,
  isTooltipVisible,
}: PropsWithChildren<{ isTooltipVisible: boolean }>) => {
  const walletProvider = useWallet()
  const { address } = useAccount(true)
  const { yagnaAddress } = useSetup()
  const { state } = useOnboarding()
  const isTransferStep = state.value === 'transfer'

  const [showYagna] = useState<boolean>(true)

  const [shouldFadeOut, setShouldFadeOut] = useState<boolean>(false)

  useEffect(() => {
    if (isTooltipVisible && !shouldFadeOut) {
      setShouldFadeOut(true)
    }
  }, [isTooltipVisible, shouldFadeOut])

  if (!address) {
    throw new Error('Address is not defined')
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
      }}
      transition={{
        duration: 1,
      }}
      className={`${
        isTooltipVisible
          ? style.greyOut
          : shouldFadeOut
          ? style.transparent
          : ''
      } col-span-12 grid grid-cols-12 gap-4 rounded-xl bg-white backdrop-filter backdrop-blur-md transition-all`}
    >
      <ProgressBar />
      <div
        className={`col-span-9 grid ${
          isTransferStep ? 'grid-cols-515' : 'grid-cols-10 '
        } mr-4 auto-rows-max transition-all duration-1000`}
      >
        <div
          className={`${style.card} ${
            showYagna ? 'col-span-5' : 'col-span-10 '
          } mt-6 mb-10 mr-4 border-1 flex flex-col border-lightblue-100 duration-1000 rounded-xl pt-8 transition-all`}
        >
          <div
            className={`transition-all duration-500 ${
              !showYagna ? `ml-[28%]` : 'ml-0'
            }`}
          >
            <WalletState
              category={AccountCategory.BROWSER_WALLET}
              provider={walletProvider}
              address={address}
            />
          </div>
        </div>

        {isTransferStep && (
          <div className="col-span-1 flex flex-col pt-40">
            <WalletsConnector />
          </div>
        )}

        <AnimatePresence>
          {showYagna ? (
            <div
              className={`${style.card} ml-4 col-span-5 mt-6 border-1 border-lightblue-100 rounded-xl pt-8 mb-auto`}
            >
              <WalletState
                category={AccountCategory.YAGNA}
                address={yagnaAddress}
              />
            </div>
          ) : (
            ''
          )}
        </AnimatePresence>

        <div
          className={`col-span-11 flex justify-center mb-10 border-1 border-lightblue-100  rounded-xl py-12 ${style.card}`}
        >
          {children}
        </div>
      </div>
    </motion.div>
  )
}
