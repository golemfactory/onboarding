import { Trans } from 'components/atoms'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { LeftDotsOrnament } from 'components/atoms/ornaments/leftDots'
import { motion } from 'framer-motion'
import { useNetwork } from 'hooks/useNetwork'

const defaultAnimationProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

export const ProgressStage = ({
  isCompleted,
  isCurrent,
  stage,
  index,
  label,
}: {
  isCompleted: boolean
  isCurrent: boolean
  stage: string
  index: number
  label?: string
}) => {
  const isFuture = !isCompleted && !isCurrent
  const { chain } = useNetwork()

  return (
    <motion.div
      animate={isCompleted ? 'completed' : isCurrent ? 'current' : 'future'}
      variants={{
        completed: {
          minHeight: '125px',
          transition: {
            duration: 1,
          },
        },
        current: {
          minHeight: '215px',
          transition: {
            duration: 1,
          },
        },
        future: {
          minHeight: '125px',
          transition: {
            duration: 1,
          },
        },
      }}
      className={`grid grid-cols-5 gap-0 ${
        isCompleted || isCurrent ? 'text-primary' : 'text-neutral-grey-200'
      }`}
    >
      <div className="col-span-1 flex flex-col items-center">
        {isCompleted && (
          <motion.div
            {...defaultAnimationProps}
            className="col-span-1 justify-center flex"
          >
            <CheckCircleIcon className=" h-10 text-success-100" />
          </motion.div>
        )}

        {isFuture ? (
          <motion.div
            {...defaultAnimationProps}
            className="w-8 h-8 text-h4 pt-0.5 flex justify-center text-center rounded-full border-1"
          >
            {index}
          </motion.div>
        ) : (
          ''
        )}
        {isCurrent && (
          <motion.div
            {...defaultAnimationProps}
            className="w-8 h-8 text-h4 pt-0.5 flex justify-center text-center rounded-full text-white bg-primary"
          >
            {index}
          </motion.div>
        )}

        <LeftDotsOrnament fill="fill-primary" isOpen={isCurrent && !label} />
        {label && (
          <div
            className={`${
              isCurrent && 'text-primary'
            } text-body-normal  mt-[64px] text-center rotate-270`}
          >
            {label}
          </div>
        )}
      </div>

      <div className="col-span-4 flex flex-col gap-3">
        <div className="text-h4">
          <Trans
            i18nKey={`${stage}.title`}
            ns="progress"
            values={{
              chain: chain?.name,
              token: chain?.nativeCurrency.symbol,
            }}
          />
        </div>
        <div className="text-body-normal font-normal">
          <Trans
            i18nKey={`${stage}.description`}
            ns="progress"
            values={{
              chain: chain?.name,
              token: chain?.nativeCurrency.symbol,
            }}
          />
        </div>
      </div>
    </motion.div>
  )
}
