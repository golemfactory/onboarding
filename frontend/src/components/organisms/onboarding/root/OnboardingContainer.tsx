//We follow presentational and container component pattern
//This is the container component for the onboarding step
//It is responsible for the launching logic

import styles from './Onboarding.module.css'

import { useContext, useState } from 'react'
import { useActor } from '@xstate/react'
import { mapStateToComponent } from 'state/mapStateToComponent'
import { Commands } from 'state/commands'
import { OnboardingContext } from 'components/providers'
import { AnimatePresence, motion } from 'framer-motion'

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))
export const OnboardingContainer = () => {
  const { service } = useContext(OnboardingContext)

  const [state, send] = useActor(service)

  const StepToRender = mapStateToComponent(state.value)

  const [show, setShow] = useState(true)
  return (
    <>
      <div className={`${styles.onboardingStep} fixed inset-0 flex items-center justify-center bg-white`}>
        <AnimatePresence>
          {show ? (
            <motion.div
              variants={{
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.7,
                    duration: 1,
                  },
                },
                hidden: {
                  opacity: 0,
                  transition: {
                    staggerChildren: 0.7,
                    duration: 1,
                  },
                },
              }}
              initial="hidden"
              animate="show"
              exit="hidden"
            >
              <StepToRender
                goToNextStep={async () => {
                  setShow(false)
                  await delay(1000)
                  send(Commands.NEXT)
                  setShow(true)
                }}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </>
  )
}
