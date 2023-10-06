import { motion } from 'framer-motion'
import onboardingStyle from '../Onboarding.module.css'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useNetwork, useSwitchNetwork } from 'wagmi'

const variants = {
  show: { opacity: 1 },
  hidden: { opacity: 0 },
}

const Presentational = ({
  onConfirm,
  supportedWallets,
}: {
  onConfirm: () => void
  supportedWallets: { name: string; isActive: boolean }[]
}) => {
  return (
    <div className={onboardingStyle.step}>
      <motion.h1 className={onboardingStyle.title} variants={variants}>
        Choose wallet
      </motion.h1>
      <motion.p className={onboardingStyle.description} variants={variants}>
        First you need to have wallet installed and connected
        <br />
        <br />
        <select>
          {supportedWallets.map((wallet) => {
            return (
              <option key={wallet.name} disabled={!wallet.isActive}>
                {wallet.name}
              </option>
            )
          })}
        </select>
      </motion.p>
      <motion.button
        className={onboardingStyle.button}
        variants={variants}
        onClick={() => {
          console.log('clicked')
          onConfirm()
        }}
      >
        Next
      </motion.button>
    </div>
  )
}

//@ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Container = ({ goToNextStep }: { goToNextStep: () => void }) => {
  //This is just placeholder
  const { open } = useWeb3Modal()
  const supportedWallets = [
    {
      name: 'Metamask',
      isActive: true,
    },
    {
      name: 'Zengo  (coming soon)',
      isActive: false,
    },
    {
      name: 'Coinbase  (coming soon)',
      isActive: false,
    },
  ]

  return <Presentational onConfirm={open} supportedWallets={supportedWallets} />
}

export const ChooseWallet = Container
