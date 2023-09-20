// import { FC, useState } from 'react'
// import { AnimatePresence, motion, stagger } from 'framer-motion'

// type Props = {
//   children?: React.ReactNode
// }

// import styles from './Onboarding.module.css'

// export const OnboardingStep: FC<Props> = ({ children }) => {
//   const [show, setShow] = useState(true)

//   return (
//     <>
//       <div className={`${styles.onboardingStep} fixed inset-0 flex items-center justify-center bg-golemblue`}>
//         <AnimatePresence>
//           {show ? (
//             <motion.div
//               variants={{
//                 show: {
//                   opacity: 1,
//                   transition: {
//                     staggerChildren: 0.7,
//                     duration: 2,
//                   },
//                 },
//                 hidden: {
//                   opacity: 0,
//                   transition: {
//                     staggerChildren: 0.7,
//                     duration: 2,
//                   },
//                 },
//               }}
//               initial="hidden"
//               animate="show"
//               exit="hidden"
//               // animate={{ opacity: 1, transition: { duration: 1.5, delayChildren: 1 } }}
//               // initial={{ opacity: 0 }}
//               // exit={{ opacity: 0, transition: { duration: 1.5 } }}
//             >
//               {children(setShow)}
//             </motion.div>
//           ) : null}
//         </AnimatePresence>
//       </div>
//     </>
//   )
//   // const [show, setShow] = useState(false)
//   // console.log('CO jest kurwa', show)
//   // return (
//   //   <>
//   //     {show ? (
//   //       <AnimatePresence>
//   //         <motion.div
//   //           className={`${styles.onboardingStep} fixed inset-0 flex items-center justify-center bg-golemblue`}
//   //           variants={{
//   //             show: {
//   //               opacity: 1,
//   //               transition: {
//   //                 staggerChildren: 0.7,
//   //               },
//   //             },
//   //             hidden: {
//   //               opacity: 0,
//   //               transition: {
//   //                 staggerChildren: 0.7,
//   //               },
//   //             },
//   //           }}
//   //           initial="hidden"
//   //           animate="show"
//   //           exit="hidden"
//   //         >
//   //           {children}

//   //           <button className="button" onClick={() => setShow(!show)}>
//   //             Show / Unshow
//   //           </button>
//   //         </motion.div>
//   //       </AnimatePresence>
//   //     ) : (
//   //       <div>
//   //         {' '}
//   //         <button className="button" onClick={() => setShow(!show)}>
//   //           Show / Unshow
//   //         </button>{' '}
//   //       </div>
//   //     )}
//   //   </>
//   // )
// }
