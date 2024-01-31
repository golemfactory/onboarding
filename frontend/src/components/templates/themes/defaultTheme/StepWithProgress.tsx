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

export const StepWithProgress = ({ children }: PropsWithChildren) => {
  const walletProvider = useWallet()
  const { address } = useAccount()
  const { yagnaAddress } = useSetup()
  const { state } = useOnboarding()
  const isTransferStep = state.value === 'transfer'

  const [childrenPlacement, setChildrenPlacement] = useState<
    'inside' | 'outside'
  >('outside')

  if (!address) {
    throw new Error('Address is not defined')
  }
  if (!yagnaAddress) {
    throw new Error('Yagna address is not defined')
  }

  return (
    <div className="col-span-12 grid grid-cols-12 gap-4 rounded-xl bg-white backdrop-filter backdrop-blur-md ">
      <ProgressBar />
      <div
        className={`col-span-9 grid ${
          isTransferStep ? 'grid-cols-515' : 'grid-cols-10 gap-x-8'
        } mr-4 auto-rows-max`}
      >
        <div
          className={`${style.card} col-span-5 mt-6 mb-10 border-1 border-lightblue-100 rounded-xl pt-8 mb-auto`}
        >
          <WalletState
            category={AccountCategory.BROWSER_WALLET}
            provider={walletProvider}
            address={address}
          />
          <AnimatePresence>
            {childrenPlacement === 'inside' && (
              <motion.div
              // initial={{ opacity: 0 }}
              // animate={{ opacity: 1 }}
              // exit={{ opacity: 0 }}
              // transition={{ ease: 'easeInOut', duration: 0.5 }}
              >
                {Children.map(children, (child) => {
                  if (isValidElement(child)) {
                    return (
                      <>
                        {cloneElement(child, {
                          //@ts-ignore
                          setPlacement: setChildrenPlacement,
                          //@ts-ignore
                          placement: childrenPlacement,
                        })}
                      </>
                    )
                  }
                })}
              </motion.div>
            )}
          </AnimatePresence>

          <hr></hr>
        </div>
        {isTransferStep && (
          <div className="col-span-1 flex flex-col pt-40">
            <WalletsConnector />
          </div>
        )}
        {/* <div className="col-span-1">
          {isTransferStep && <WalletsConnector />}
        </div> */}
        <div
          className={`${style.card} col-span-5 mt-6 border-1 border-lightblue-100 rounded-xl pt-8 mb-auto`}
        >
          <WalletState
            category={AccountCategory.YAGNA}
            address={yagnaAddress}
          />
        </div>
        <AnimatePresence>
          {childrenPlacement === 'outside' && (
            <motion.div
              // initial={{ opacity: 0 }}
              // animate={{ opacity: 1 }}
              // exit={{ opacity: 0 }}
              // transition={{ ease: 'easeInOut', duration: 0.5 }}
              className="col-span-11 flex mt-8 justify-center"
            >
              {Children.map(children, (child) => {
                if (isValidElement(child)) {
                  return cloneElement(child, {
                    //@ts-ignore
                    setPlacement: setChildrenPlacement,
                    //@ts-ignore
                    placement: childrenPlacement,
                  })
                }
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
