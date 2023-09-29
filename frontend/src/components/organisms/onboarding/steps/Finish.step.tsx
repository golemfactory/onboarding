// components/welcome/intro.tsx
import { useMetaMask } from 'components/providers'
import { motion } from 'framer-motion'
import { WalletState } from 'types/dataContext'
import { formatEther } from 'ethers'
const variants = {
  show: { opacity: 1 },
  hidden: { opacity: 0 },
}
const FinishPresentational = ({ wallet }: { wallet: WalletState }) => {
  console.log('wa', wallet)
  return (
    <div className="text-center">
      <motion.h1
        className="text-4xl font-bold mb-4 text-black"
        variants={variants}
      >
        All good
      </motion.h1>
      <motion.p
        className="max-w-md text-black my-4 text-xl"
        variants={variants}
      >
        You are ready to use Golem network now. Your balances are{' '}
        {formatEther(wallet.balance.GLM)} GLM and{' '}
        {formatEther(wallet.balance.NATIVE)} Matic.
      </motion.p>
    </div>
  )
}

export const Finish = () => {
  const { wallet } = useMetaMask()

  return <FinishPresentational wallet={wallet} />
}
