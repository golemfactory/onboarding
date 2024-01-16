import { FC } from 'react'
import globalStyle from 'styles/global.module.css'
import templateStyle from './Step.template.module.css'
import { StepLayoutPropsType } from 'types/ui'
import { Bullet, Trans } from 'components/atoms'
import {
  InfoTooltip,
  InfoTooltipTrigger,
} from 'components/organisms/tooltip/InfoTooltip'

const style = {
  ...globalStyle,
  ...templateStyle,
}

export const StepTemplate: FC<StepLayoutPropsType> = ({
  name,
  Component,
}: StepLayoutPropsType) => {
  const namespace = `${name}.step`
  return (
    <div className={style.container}>
      <div className={style.textContainer}>
        <div className={style.title}>
          <Trans i18nKey="title" ns={namespace} />
        </div>
        <div className={style.descriptionContainer}>
          <div className="col-span-1">
            <Bullet />
          </div>
          <div className="col-span-11 flex flex-col gap-4">
            <div className={style.subtitle}>
              <div className="col-span-6 flex gap-2">
                <Trans i18nKey="subtitle" ns={namespace} />
                <InfoTooltipTrigger id={name} />
              </div>
              <div className="col-span-5 -mr-4 ml-4">
                {name === 'welcome' ? <InfoTooltip id="welcome" /> : ''}
              </div>
            </div>
            <div className={style.description}>
              <div className="col-span-10">
                <Trans i18nKey="description" ns={namespace} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Component />
    </div>
  )
}
