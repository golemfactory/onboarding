// components/welcome/intro.tsx
import { motion } from 'framer-motion'
import { GolemIcon, MaticIcon } from 'components/atoms/icons'
import { useBalance } from 'hooks/useBalance'
import { formatBalance } from 'utils/formatBalance'
import { useSetup } from 'components/providers'
const variants = {
  show: { opacity: 1 },
  hidden: { opacity: 0 },
}
const FinishPresentational = ({
  balance,
}: {
  balance: ReturnType<typeof useBalance>
}) => {
  return (
    <div className="text-center">
      <motion.h1
        className="text-4xl font-bold mb-4 text-black"
        variants={variants}
      >
        All good
      </motion.h1>
      <motion.div className="text-black my-4 text-xl" variants={variants}>
        <h2> You are ready to use Golem </h2>
        <br />
        <div className="ml-12">
          <div className="flex">
            <div
              style={{ width: '30px', height: '30px' }}
              className="border-2 border-golemblue p-1 rounded-full mr-2"
            >
              <GolemIcon style={{ maxHeight: '30px' }} />{' '}
            </div>
            <div className="text-lg">
              {formatBalance(balance.GLM)} <br />
            </div>
          </div>

          <div className="flex mt-2">
            <div
              style={{ width: '30px', height: '30px' }}
              className="border-2 border-golemblue p-1 rounded-full mr-2"
            >
              <MaticIcon style={{ maxHeight: '30px' }} />{' '}
            </div>
            <div className="text-lg">
              {formatBalance(balance.NATIVE)} <br />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export const Finish = () => {
  const { yagnaAddress } = useSetup()
  const balance = useBalance(yagnaAddress)
  return <FinishPresentational balance={balance} />
}
