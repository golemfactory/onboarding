import { ReactElement, useCallback, useState } from 'react'
import { isEveryKeyUnique } from 'utils/isEveryKeyUnique'
import { ChevronDownIcon } from 'components/atoms/icons'
import { AnimatePresence, motion } from 'framer-motion'
import { getStyle } from 'utils/getStyle'

//moved to separate component to allow for exit animation
const AccordionItem = ({
  isOpen,
  content,
  style,
}: {
  isOpen: boolean
  content: ReactElement
  style: string
}) => {
  const lineHeight = getStyle(style, 'line-height') // Retrieve line height
  if (!lineHeight) {
    throw new Error('Font size not found')
  }
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, lineHeight: 0 }}
          animate={{ opacity: 1, lineHeight }}
          exit={{ opacity: 0, lineHeight: 0 }}
          transition={{ duration: 0.3 }}
          className={`${style}`}
        >
          {content}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const AccordionItemHeader = ({
  title,
  isOpen,
  toggleAccordion,
  style,
}: {
  title: ReactElement
  isOpen: boolean
  toggleAccordion: () => void
  style: {
    title: string
    icon: string
  }
}) => {
  return (
    <div className={`${style.title}`}>
      {title}
      <motion.div
        animate={{
          rotate: isOpen ? 180 : 0,
        }}
        transition={{
          duration: 0.3,
        }}
        className={`${style.icon}`}
        onClick={toggleAccordion}
      >
        <ChevronDownIcon />
      </motion.div>
    </div>
  )
}

export const Accordion = ({
  items,
  style,
}: {
  items: { title: ReactElement; content: ReactElement; key: string }[]
  style: Record<string, string>
}) => {
  if (!isEveryKeyUnique(items, 'key')) {
    throw new Error('Keys must be unique')
  }

  const [AccordionItems, setAccordionItems] = useState(
    items.map((item) => {
      return {
        ...item,
        isOpen: false,
      }
    })
  )

  const toggleAccordion = useCallback(
    (key: string) => {
      setAccordionItems(
        AccordionItems.map((item) => {
          if (item.key === key) {
            return {
              ...item,
              isOpen: !item.isOpen,
            }
          }
          return item
        })
      )
    },
    [AccordionItems]
  )

  return (
    <div className={`${style.container}`}>
      {AccordionItems.map((item) => {
        return (
          <div key={item.key}>
            <AccordionItemHeader
              title={item.title}
              isOpen={item.isOpen}
              toggleAccordion={() => toggleAccordion(item.key)}
              style={{
                title: style.title,
                icon: style.icon,
              }}
            />
            <AccordionItem
              isOpen={item.isOpen}
              content={item.content}
              style={style.content}
            />
          </div>
        )
      })}
    </div>
  )
}
