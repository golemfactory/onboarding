import { Button, Trans } from 'components/atoms'
import { AnimatePresence, motion } from 'framer-motion'
import { StepType } from 'state/steps'

export const StartButton = ({
  onClick,
  step,
}: {
  onClick: () => void
  step: StepType
}) => {
  const ns = `${step}.step`
  return (
    <AnimatePresence>
      <motion.div
        variants={{
          open: { opacity: 1 },
          closed: { opacity: 0 },
          initial: { opacity: 0 },
        }}
        initial="initial"
        animate={'open'}
        exit="closed"
        transition={{ duration: 1 }}
        className="w-full flex flex-col col-span-2 gap-4 mt-8"
      >
        <div className="flex w-full justify-center text-h4 text-primary">
          <Trans i18nKey="startButtonLabel" ns={ns} />
        </div>
        <div className="flex w-full justify-center">
          <Button
            buttonStyle="solid"
            className="px-9 py-4 text-button-large"
            onClick={onClick}
          >
            <Trans i18nKey="startButtonText" ns={ns} />
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
