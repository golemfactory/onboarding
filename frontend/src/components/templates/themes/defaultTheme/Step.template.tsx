import { FC, useState } from 'react'
import globalStyle from 'styles/global.module.css'
import templateStyle from './step.template.module.css'
import { StepLayoutPropsType } from 'types/ui'
import { Bullet, Button, Trans } from 'components/atoms'
import {
  InfoTooltip,
  InfoTooltipTrigger,
} from 'components/organisms/tooltip/InfoTooltip'
import { useOnboarding } from 'hooks/useOnboarding'
import { Commands } from 'state/commands'
// import { SuccessIcon, TrustStackedIcon } from 'components/atoms/icons'

const style = {
  ...globalStyle,
  ...templateStyle,
}

//TODO : divide into two components to separate logic and presentation

export const StepTemplate: FC<StepLayoutPropsType> = function ({
  name,
  Component,
  IconComponent,
  placement,
}: StepLayoutPropsType) {
  const [isReadyForNextStep, setIsReadyForNextStep] = useState(true)
  const [isNextCalled, setIsNextCalled] = useState(false)

  const { send } = useOnboarding()
  useState(false)

  const namespace = `${name}.step`
  return (
    <div className={style.container}>
      <div className={style.textContainer}>
        <div className=" col-span-10 mt-24 justify-between grid grid-cols-10">
          <div className={`${style.title} col-span-4`}>
            <Trans i18nKey="title" ns={namespace} />
          </div>
          {IconComponent ? <IconComponent /> : ''}
        </div>

        <div className={style.descriptionContainer}>
          <div className="col-span-1">
            <Bullet useTopStroke={false} />
          </div>
          <div className="col-span-11 flex flex-col gap-4">
            <div className={style.subtitle}>
              <div className="col-span-6 flex gap-2">
                <Trans i18nKey="subtitle" ns={namespace} />
                <InfoTooltipTrigger id={name} />
              </div>
              <div className="col-span-5 -mr-4 ml-4">
                <InfoTooltip id={name} />
              </div>
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
        <Button
          buttonStyle="solid"
          style={{
            padding: '16px 50px',
            fontSize: '16px',
          }}
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
      </div>
    </div>
  )
}
