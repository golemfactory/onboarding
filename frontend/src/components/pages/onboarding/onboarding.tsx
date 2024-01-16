//We follow presentational and container component pattern
//This is the container component for the onboarding step
//It is responsible for the launching logic

import { getStepDetails } from 'state/getStepDetails'

// import styles from '../Onboarding.module.css'

// import { useContext, useState } from 'react'
import { useActor } from '@xstate/react'
import { OnboardingContext } from 'components/providers'
import { useContext } from 'react'
import { useTheme } from 'components/providers/ThemeProvider'
// import { mapStateToComponent } from 'state/getStepDetails'
// import { Commands } from 'state/commands'
// import { OnboardingContext, useSetup } from 'components/providers'
// import { AnimatePresence, motion } from 'framer-motion'
// import { ProgressBar } from 'components/organisms'
// import { isBeta } from 'utils/isBeta'
// import { BetaRibbon } from 'components/atoms/ribbon/ribbon'
// import { LayoutTemplate } from 'components/templates/themes/defaultTheme/Layout.template'

// const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

// const OnboardingContainer = () => {
//   const [state, send] = useActor(service)
//   const StepToRender = mapStateToComponent(state.value)
//   const { yagnaAddress } = useSetup()
//   const [show, setShow] = useState(true)
//   return <div className="flex flex-col"></div>
// }

export const OnboardingPage = () => {
  const { service } = useContext(OnboardingContext)
  const theme = useTheme()

  const LayoutTemplate = theme.getLayoutTemplate()
  const StepTemplate = theme.getStepTemplate()

  //@ts-ignore

  const [state] = useActor(service)
  const { name, component } = getStepDetails(state.value)
  return (
    <LayoutTemplate
      main={<StepTemplate name={name} Component={component} />}
    ></LayoutTemplate>

    // <>
    //   <div
    //     //TODO : move to css module
    //     className={`${styles.onboardingStep} fixed inset-0 flex items-center justify-center bg-white p-4`}
    //   >
    //     <ProgressBar
    //       showYagnaStep={!!yagnaAddress}
    //       stage={{ value: state.context.stage }}
    //     />

    //     <div className={`${styles.break}`} />

    //     {isBeta() ? <BetaRibbon /> : ''}
    //     <AnimatePresence>
    //       {show ? (
    //         <motion.div
    //           className="pb-48"
    //           variants={{
    //             show: {
    //               opacity: 1,
    //               transition: {
    //                 staggerChildren: 0.7,
    //                 duration: 1,
    //               },
    //             },
    //             hidden: {
    //               opacity: 0,
    //               transition: {
    //                 staggerChildren: 0.7,
    //                 duration: 1,
    //               },
    //             },
    //           }}
    //           initial="hidden"
    //           animate="show"
    //           exit="hidden"
    //         >
    //           <StepToRender
    //             goToNextStep={async () => {
    //               setShow(false)
    //               await delay(1000)
    //               send(Commands.NEXT)
    //               setShow(true)
    //             }}
    //           />
    //         </motion.div>
    //       ) : null}

    //   </div>
    // </>
  )
}
