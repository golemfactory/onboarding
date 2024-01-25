import { FC, useState } from 'react'
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
    main: Component,
    ornament: OrnamentComponent,
    placement,
    name,
    showNextButton,
  } = stepRenderDetails

  const [isReadyForNextStep, setIsReadyForNextStep] = useState(true)
  const [isNextCalled, setIsNextCalled] = useState(false)
  const { send } = useOnboarding()
  const namespace = `${name}.step`

  return (
    <div className={style.container}>
      <RightDot top={name === 'chooseNetwork' ? '650px' : '750px'} />
      <div className={style.textContainer}>
        <div className=" col-span-10 mt-24 justify-between grid grid-cols-10">
          <div className={`${style.title} col-span-4`}>
            <Trans i18nKey="title" ns={namespace} />
          </div>
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
            <div className={style.subtitle}>
              <Trans i18nKey="subtitle" ns={namespace} />
              <InfoTooltipTrigger id={name} appearance="primary" />
              <InfoTooltip id={name} appearance="primary" />
            </div>
            <div className={style.description}>
              <div className="col-span-10">
                <Trans i18nKey="description" ns={namespace} />
              </div>
            </div>
            {placement === 'inside' ? (
              <Component
                setIsCompleted={setIsReadyForNextStep}
                isNextCalled={isNextCalled}
              />
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
      {placement === 'outside' ? (
        <Component
          setIsCompleted={setIsReadyForNextStep}
          isNextCalled={isNextCalled}
        />
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
                if (isReadyForNextStep) {
                  send(Commands.NEXT)
                }
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
