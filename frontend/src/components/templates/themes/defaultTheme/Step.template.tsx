import { FC, useEffect, useState } from 'react'
import globalStyle from 'styles/global.module.css'
import templateStyle from './step.template.module.css'
import { StepRenderDetailsType } from 'types/ui'
import { Bullet, Button, Trans } from 'components/atoms'
import {
  InfoTooltip,
  InfoTooltipTrigger,
} from 'components/organisms/tooltip/InfoTooltip'
import { useOnboarding } from 'hooks/useOnboarding'
import { Commands } from 'state/commands'
import { RightDot } from 'components/atoms/ornaments/rightDot'
import { motion } from 'framer-motion'
import { AnimatedText } from 'components/molecules/animateText/AnimatedText'
import { set } from 'lodash'
// import { SuccessIcon, TrustStackedIcon } from 'components/atoms/icons'

const style = {
  ...globalStyle,
  ...templateStyle,
}

//TODO : divide into two components to separate logic and presentation

export const StepTemplate: FC<StepRenderDetailsType> = function (
  stepRenderDetails: StepRenderDetailsType
) {
  const {
    layout: LayoutComponent,
    main: MainComponent,
    ornament: OrnamentComponent,
    placement,
    name,
    showNextButton,
  } = stepRenderDetails
  const [isReadyForNextStep, setIsReadyForNextStep] = useState(true)
  const [isNextCalled, setIsNextCalled] = useState(false)
  const { send } = useOnboarding()
  const [namespace, setNamespace] = useState(`${name}.step`)

  const [textVisible, setTextVisible] = useState(true)

  useEffect(() => {
    setTextVisible(!textVisible)
    setTimeout(() => {
      setTextVisible(textVisible)
      setNamespace(`${name}.step`)
    }, 1000)
  }, [name])

  window.gtns = () => {
    send(Commands.NEXT)
  }

  return (
    <div className={style.container}>
      <RightDot top={name === 'chooseNetwork' ? '650px' : '750px'} />
      <div className={style.textContainer}>
        <div className=" col-span-10 mt-24 justify-between grid grid-cols-10">
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`${style.title} col-span-4`}
          >
            <AnimatedText
              i18nKey="title"
              ns={namespace}
              visibility={textVisible ? 'visible' : 'hidden'}
            />
          </motion.div>
          <div className="col-span-3 col-start-7 relative">
            {OrnamentComponent ? <OrnamentComponent /> : ''}
          </div>
        </div>
        <div className="col-span-2"></div>
        <div className={style.descriptionContainer}>
          <div className="col-span-1">
            <Bullet useTopStroke={false} />
          </div>
          <div className="col-span-11 flex flex-col gap-4">
            <div className="flex flex-wrap justify-between">
              <div className={style.subtitle}>
                <AnimatedText
                  i18nKey="subtitle"
                  ns={namespace}
                  visibility={textVisible ? 'visible' : 'hidden'}
                />{' '}
              </div>
              <motion.div
                variants={{
                  visible: {
                    opacity: 1,
                  },
                  hidden: {
                    opacity: 0,
                  },
                }}
                transition={{
                  duration: 1,
                }}
                initial="hidden"
                animate={textVisible ? 'visible' : 'hidden'}
                className={style.tooltipTriggerContainer}
              >
                <InfoTooltipTrigger id={name} appearance="primary" />
              </motion.div>
              <div className="ml-auto">
                <InfoTooltip id={name} appearance="primary" />
              </div>
            </div>

            <div className={style.description}>
              <div className="col-span-10">
                <AnimatedText
                  i18nKey="description"
                  ns={namespace}
                  visibility={textVisible ? 'visible' : 'hidden'}
                />{' '}
              </div>
            </div>
            {placement === 'inside' ? (
              <LayoutComponent>
                <MainComponent
                  setIsCompleted={setIsReadyForNextStep}
                  isNextCalled={isNextCalled}
                  goToNextStep={() => {
                    send(Commands.NEXT)
                  }}
                />
              </LayoutComponent>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
      {placement === 'outside' ? (
        <LayoutComponent>
          <MainComponent
            setIsCompleted={setIsReadyForNextStep}
            isNextCalled={isNextCalled}
            goToNextStep={() => {
              send(Commands.NEXT)
            }}
          />
        </LayoutComponent>
      ) : (
        ''
      )}

      <div className="col-span-12 flex justify-end mt-12">
        {showNextButton ? (
          <Button
            buttonStyle="solid"
            className="py-4 px-9 text-button-large"
            useDefault={false}
            onClick={() => {
              setIsNextCalled(true)
              if (isReadyForNextStep) {
                setIsNextCalled(false)
                send(Commands.NEXT)
              }
            }}
          >
            {' '}
            Next
          </Button>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}
