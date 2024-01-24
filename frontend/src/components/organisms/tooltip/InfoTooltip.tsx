import { InfoIcon } from 'components/atoms/icons/info.icon'
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import { useTooltip } from 'components/providers/Tooltip.provider'
import { PropsWithChildren, useState } from 'react'
import { useToggle } from 'usehooks-ts'

import tooltipStyle from './infoTooltip.module.css'
import { Button, Trans } from 'components/atoms'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { XIcon } from 'components/atoms/icons'
import { Accordion } from 'components/molecules/accordion/Accordion'
import { start } from 'repl'

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
      className="cursor-pointer"
      onClick={() => {
        appearance === 'primary' ? tooltip.toggle?.() : ''
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
  const { t, ready } = useTranslation()

  if (!ready) {
    return <></>
  }
  const description = t(`${id}.description`, {
    returnObjects: true,
    ns: 'tooltips',
  }) as string[]
  // Assuming 'items' is your key in the JSON file
  return (
    <div className={`${tooltipStyle.card}`}>
      <div
        className={`${tooltipStyle.xicon}`}
        onClick={() => {
          tooltip.hide?.()
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
        {/* <div onClick={toggleMoreInfo}>dupa</div> */}
        {Object.keys(sections).map((sectionId) => {
          return (
            <div key={`section_${sectionId}`} className="flex flex-col gap-2">
              <div onClick={() => toggleSection(sectionId)} />
            </div>
          )
        })}
        {isMoreInfoOpen ? (
          <div className="flex flex-col gap-2">
            <Accordion
              items={tooltip.sections.map((section) => {
                return {
                  title: (
                    <Trans i18nKey={`${id}.${section}.title`} ns="tooltips" />
                  ),
                  content: (
                    <Trans i18nKey={`${id}.${section}.content`} ns="tooltips" />
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
          </div>
        ) : (
          <div>
            <Button
              buttonStyle="underline"
              className="col-span-2 col-start-2 text-sm"
              onClick={toggleMoreInfo}
              useDefault={true}
            >
              <Trans i18nKey="moreInfo" ns="tooltips" />
            </Button>
          </div>
        )}
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

  //while tooltip state control is handled by the provider, sections open/close managment has to happen locally

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

  const variants = {
    open: { opacity: 1 },
    closed: { opacity: 0 },
  }

  return (
    <div
      className="relative"
      style={{ pointerEvents: tooltip.visible ? 'auto' : 'none' }}
    >
      <motion.div
        variants={variants}
        animate={tooltip.visible ? 'open' : 'closed'}
        transition={{
          duration: 0.3,
          ease: 'easeInOut',
        }}
        className="absolute top-0 left-0 z-200"
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
