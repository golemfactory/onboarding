import { Trans as TransComponent } from 'components/atoms/translation/Trans'
import i18next from 'i18next'
import {
  ComponentProps,
  MutableRefObject,
  PropsWithChildren,
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react'
import { motion, useAnimation } from 'framer-motion'

i18next.use({
  type: 'postProcessor',
  name: 'wrapWords',
  process: function (value: string) {
    const regex =
      /(?<=\s|^)([a-zA-Z0-9]+(?:[.,']?[a-zA-Z0-9]+)*[.,?!]?)(?=\s|$)/g

    let index = 0
    return value.replace(regex, (match) => {
      return match
        .split('')
        .map((x) => {
          return `<word class="word word_${index++}">${x}</word>`
        })
        .join('')
    })
  },
})

const itemVariants = {
  hidden: (delayRef: MutableRefObject<number>) => ({
    opacity: 0,
    scale: 0,
    transition: { delay: delayRef.current, duration: 0.5 },
  }),
  visible: (delayRef: MutableRefObject<number>) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: delayRef.current, duration: 0.5 },
  }),
}

const Word = function Word({
  children,
  originIndex,
  originOffset,
}: PropsWithChildren<{
  originIndex: number
  originOffset: MutableRefObject<{ top: number; left: number; count: number }>
}>) {
  const delayRef = useRef(Math.random() * 0.5)
  const ref = useRef<HTMLSpanElement>(null)

  return (
    <motion.span ref={ref} variants={itemVariants} custom={delayRef}>
      {children}
    </motion.span>
  )
}
export const AnimatedText = (
  props: ComponentProps<typeof TransComponent> & {
    visibility: 'visible' | 'hidden'
  }
) => {
  const originOffset = useRef({ top: 0, left: 0, count: 0 })
  const controls = useAnimation()

  useEffect(() => {
    if (props.visibility === 'visible') {
      controls.start('visible')
    } else if (props.visibility === 'hidden') {
      controls.start('hidden')
    }
  }, [props.visibility])

  return (
    <motion.div initial="hidden" animate={controls}>
      <TransComponent
        {...props}
        tOptions={{
          postProcess: ['wrapWords'],
        }}
        components={{
          word: (
            <Word
              originOffset={originOffset}
              originIndex={Math.round(Math.random() * 10)}
            ></Word>
          ),
        }}
      />
    </motion.div>
  )
}
