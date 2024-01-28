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
import { RecommendationCard } from 'components/molecules/recommendationCard/RecommendationCard'
import { PropsWithChildren, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
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

  if (!address) {
    throw new Error('Address is not defined')
  }
  if (!yagnaAddress) {
    throw new Error('Yagna address is not defined')
  }
  return (
    <div className="col-span-12 grid grid-cols-12 gap-4 rounded-xl bg-white backdrop-filter backdrop-blur-md ">
      <ProgressBar />
      <div className="col-span-9 grid grid-cols-2 gap-x-8 items-center">
        <div
          className={`${style.card} col-span-1 mt-6 border-1 border-lightblue-100 rounded-xl pt-8 mb-auto`}
        >
          <WalletState
            category={AccountCategory.BROWSER_WALLET}
            provider={walletProvider}
            address={address}
          />
          <hr></hr>

          <RecommendationCard />
        </div>
        <div
          className={`col-span-1 mt-6 border-1 border-lightblue-100 rounded-xl pt-8 mb-auto`}
        >
          <WalletState
            category={AccountCategory.YAGNA}
            address={yagnaAddress}
          />
        </div>
        {children}
      </div>
    </div>
  )
}
