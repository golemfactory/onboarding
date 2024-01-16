import { InfoIcon } from 'components/atoms/icons/info.icon'
import { useTooltip } from 'components/providers/Tooltip.provider'
import { PropsWithChildren, useState } from 'react'
import { useToggle } from 'usehooks-ts'

import tooltipStyle from './infoTooltip.module.css'
import { Button, Trans } from 'components/atoms'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export const InfoTooltipTrigger = ({
  id,
  children,
}: PropsWithChildren<{ id: string }>) => {
  const tooltip = useTooltip(id)

  //by default, the tooltip will be triggered by clicking on the info icon
  //but you can also pass a custom component as a child to trigger the tooltip

  return (
    <div className="cursor-pointer" onClick={tooltip.toggle}>
      {children || <InfoIcon></InfoIcon>}
    </div>
  )
}

//TODO : move to theme

export const InfoTooltipPresentational = ({
  isMoreInfoOpen,
  toggleMoreInfo,
  sections,
  toggleSection,
  id,
}: {
  id: string
  isMoreInfoOpen: boolean
  toggleMoreInfo: () => void
  sections: { [key: string]: { isOpen: boolean } }
  toggleSection: (id: string) => void
}) => {
  const { t, ready } = useTranslation()

  if (!ready) {
    return <></>
  }
  const description = t(`${id}.description`, {
    returnObjects: true,
    ns: 'tooltips',
  }) as string[]
  console.log('description', description)
  // Assuming 'items' is your key in the JSON file
  return (
    <div className={`flex flex-col gap-4 ${tooltipStyle.card}`}>
      <div className={`${tooltipStyle.title}`}>
        <Trans i18nKey={`${id}.title`} ns="tooltips" />
      </div>
      <div className={`${tooltipStyle.description}`}>
        {description.map((item, idx) => {
          return <div key={`welcome_desc_${idx}`}>{item}</div>
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
          <div onClick={toggleMoreInfo}>dupa</div>
        </div>
      ) : (
        <Button
          buttonStyle="underline"
          className="col-span-2 col-start-2"
          onClick={toggleMoreInfo}
          useDefault={true}
        >
          <Trans i18nKey="moreInfo" ns="tooltips" />
        </Button>
      )}
    </div>
  )
}

export const InfoTooltip = ({
  id,
  children,
}: PropsWithChildren<{ id: string }>) => {
  const tooltip = useTooltip(id)

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
    <div className="relative">
      <motion.div
        variants={variants}
        animate={tooltip.visible ? 'open' : 'closed'}
        transition={{ duration: 0.3 }}
        className="absolute top-0 left-0"
      >
        <InfoTooltipPresentational
          isMoreInfoOpen={isMoreInfoOpen}
          toggleMoreInfo={toggleMoreInfo}
          sections={sections}
          toggleSection={toggleSection}
          id={id}
        />
      </motion.div>

      {children}
    </div>
  )
}
