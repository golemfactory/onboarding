import { InfoIcon } from 'components/atoms/icons/info.icon'
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import { useTooltip } from 'components/providers/Tooltip.provider'
import { PropsWithChildren, useEffect, useRef, useState } from 'react'
import { useToggle } from 'usehooks-ts'

import tooltipStyle from './infoTooltip.module.css'
import { Button, Trans } from 'components/atoms'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { XIcon } from 'components/atoms/icons'
import { Accordion } from 'components/molecules/accordion/Accordion'

const variants = {
  open: { opacity: 1, zIndex: 200 },
  closed: { opacity: 0, zIndex: 200 },
  initial: { opacity: 0 },
}

export const InfoTooltipTrigger = ({
  id,
  children,
  appearance = 'primary',
  name,
}: PropsWithChildren<{
  id: string
  appearance: 'primary' | 'secondary'
  name?: string
}>) => {
  const tooltip = useTooltip(id, name)

  if (!tooltip) {
    return <></>
  }
  //by default, the tooltip will be triggered by clicking on the info icon
  //but you can also pass a custom component as a child to trigger the tooltip

  return (
    <div
      className={`cursor-pointer transition-all inline-block ${
        appearance === 'secondary' ? 'align-middle' : ''
      }`}
      onClick={(event) => {
        appearance === 'primary' ? tooltip.show?.() : ''
        event.stopPropagation()
      }}
      onMouseEnter={() => {
        appearance === 'secondary' ? tooltip.show?.() : ''
      }}
      onMouseLeave={() => {
        appearance === 'secondary' ? tooltip.startHide?.() : ''
      }}
    >
      {children ||
        {
          primary: <InfoIcon className="h-line-1"></InfoIcon>,
          secondary: (
            <InformationCircleIcon className="h-6 text-primary -mt-1"></InformationCircleIcon>
          ),
        }[appearance]}
    </div>
  )
}

//TODO : move to theme

export const InfoTooltipPresentationalPrimary = ({
  isMoreInfoOpen,
  toggleMoreInfo,
  sections,
  toggleSection,
  id,
  tooltip,
}: {
  id: string
  isMoreInfoOpen: boolean
  toggleMoreInfo: () => void
  sections: { [key: string]: { isOpen: boolean } }
  toggleSection: (sectionId: string) => void
  tooltip: ReturnType<typeof useTooltip>
}) => {
  const tooltipRef = useRef<HTMLDivElement>(null)

  //Hide tooltip when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        tooltipRef.current !== null &&
        !tooltipRef.current?.contains(event.target as Node)
      ) {
        tooltip.hide?.()
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  const { t, ready } = useTranslation()

  if (!ready) {
    return <></>
  }
  const description = t(`${id}.description`, {
    returnObjects: true,
    ns: 'tooltips',
  }) as string[]

  return (
    <div ref={tooltipRef} className={`${tooltipStyle.card}`}>
      <div
        className={`${tooltipStyle.xicon}`}
        onClick={() => {
          tooltip.hide?.()
          if (isMoreInfoOpen) {
            toggleMoreInfo()
          }
        }}
      >
        <XIcon />
      </div>
      <div className={`flex flex-col gap-4 ${tooltipStyle.content}`}>
        <div className={`${tooltipStyle.title}`}>
          <Trans i18nKey={`${id}.title`} ns="tooltips" />
        </div>
        <div className={`${tooltipStyle.description}`}>
          {description.map((item, idx) => {
            return (
              <div key={idx}>
                <Trans i18nKey={item} ns="tooltips" />
              </div>
            )
          })}
        </div>
        {Object.keys(sections).map((sectionId) => {
          return (
            <div key={`section_${sectionId}`} className="flex flex-col gap-2">
              <div onClick={() => toggleSection(sectionId)} />
            </div>
          )
        })}
        <AnimatePresence>
          <motion.div variants={variants}>
            <Button
              buttonStyle="underline"
              className="col-span-2 col-start-2 text-sm px-1 py-1.5"
              onClick={toggleMoreInfo}
              useDefault={true}
            >
              <Trans i18nKey="moreInfo" ns="tooltips" />
            </Button>
          </motion.div>
        </AnimatePresence>
        <AnimatePresence>
          {isMoreInfoOpen ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: 1,
                height: 'auto',
                transition: {
                  opacity: {
                    delay: 0.3, // Starts opacity animation after height animation
                    duration: 0.3,
                  },
                  height: {
                    duration: 0.3,
                  },
                },
              }}
              exit={{
                opacity: 0,
                height: 0,
                transition: {
                  opacity: {
                    duration: 0.3,
                  },
                  height: {
                    duration: 0.3,
                    delay: 0.3,
                  },
                },
              }}
              className="flex flex-col gap-2"
            >
              <Accordion
                items={tooltip.sections.map((section) => {
                  return {
                    title: (
                      <Trans i18nKey={`${id}.${section}.title`} ns="tooltips" />
                    ),
                    content: (
                      <Trans
                        i18nKey={`${id}.${section}.content`}
                        ns="tooltips"
                      />
                    ),
                    key: section,
                  }
                })}
                style={{
                  container: 'flex flex-col gap-2',
                  title: `${tooltipStyle.sectionTitle} flex flex-row justify-left items-center mb-3`,
                  content: `${tooltipStyle.sectionDescription}`,
                  icon: `${tooltipStyle.chevronIcon}`,
                }}
              />
            </motion.div>
          ) : (
            ''
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export const InfoTooltipPresentationalSecondary = ({
  id,
  tooltip,
}: {
  id: string
  tooltip: ReturnType<typeof useTooltip>
}) => {
  const { t } = useTranslation()

  const description = t(`${id}.description`, {
    returnObjects: true,
    ns: 'tooltips',
  }) as string[]

  return (
    <div
      className={`${tooltipStyle.cardSecondary}`}
      onMouseLeave={() => {
        tooltip.hide?.()
      }}
      onMouseEnter={
        () => {
          tooltip.cancelHide?.()
        }
        //appearance === 'secondary' ? tooltip.hide?.() : ''
      }
    >
      <div className={`${tooltipStyle.secondaryDescription}`}>
        {description.map((item, idx) => {
          return (
            <div key={idx}>
              <Trans i18nKey={item} ns="tooltips" />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export const InfoTooltip = ({
  id,
  children,
  appearance = 'primary',
  name,
}: PropsWithChildren<{
  id: string
  appearance: 'primary' | 'secondary'
  name?: string
}>) => {
  const tooltip = useTooltip(id, name)

  type SectionIds = (typeof tooltip.sections)[number]
  //while tooltip state control  is handled by the provider, sections open/close managment has to happen locally
  const [sections, setSections] = useState(
    tooltip.sections.reduce((acc, section) => {
      return {
        ...acc,
        [section]: {
          isOpen: false,
        },
      }
    }, {} as { [K in SectionIds]: { isOpen: boolean } })
  )

  const toggleSection = (sectionId: keyof typeof sections) => {
    setSections({
      ...sections,
      [sectionId]: {
        isOpen: !sections[sectionId].isOpen,
      },
    })
  }
  const [isMoreInfoOpen, toggleMoreInfo] = useToggle(false)

  return (
    <div
      className="relative"
      style={{
        pointerEvents: tooltip.visible ? 'auto' : 'none',
        width: appearance === 'primary' ? '450px' : 'auto',
      }}
    >
      <motion.div
        variants={variants}
        animate={tooltip.visible ? 'open' : 'closed'}
        initial="closed"
        transition={{
          duration: 0.1,
          ease: 'easeInOut',
        }}
        className="absolute top-0 left-0"
      >
        {appearance === 'primary' ? (
          <InfoTooltipPresentationalPrimary
            isMoreInfoOpen={isMoreInfoOpen}
            toggleMoreInfo={toggleMoreInfo}
            sections={sections}
            toggleSection={toggleSection}
            id={id}
            tooltip={tooltip}
          />
        ) : (
          <InfoTooltipPresentationalSecondary
            id={id}
            tooltip={tooltip}
          ></InfoTooltipPresentationalSecondary>
        )}
      </motion.div>

      {children}
    </div>
  )
}
