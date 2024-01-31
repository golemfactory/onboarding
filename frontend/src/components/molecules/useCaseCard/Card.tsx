import { RightArrowIcon } from 'components/atoms/icons'
import cardStyle from './Card.module.css'
import globalStyle from 'styles/global.module.css'
import { Button, Trans } from 'components/atoms'
import { MakeRequired } from 'types/utils'
import { FC } from 'react'

const defaultStyle = {
  ...globalStyle,
  ...cardStyle,
}

export type CardDataType = {
  icon: FC<{ className: string }>
  title: string
  description: string
  badge?: string
  exploreLink?: string
  buttonText?: string
  namespace: string
  style?: Record<string, string>
  appearance?: 'landing' | 'finish'
}

export const CardLanding = ({
  icon: Icon,
  title,
  description,
  badge,
  exploreLink,
  namespace,
  style,
}: MakeRequired<CardDataType, 'style'>) => {
  return (
    <div className={`${style.cardLanding}`}>
      <div className={style.topLanding}>
        <Icon className={`${style.iconLanding}`} />

        {badge ? (
          <div className={style.badgeLanding}>
            <Trans i18nKey={badge} ns={namespace} />
          </div>
        ) : (
          ''
        )}
      </div>
      <div className={style.contentLanding}>
        <div className={`${style.titleLanding}`}>
          <Trans i18nKey={title} ns={namespace} />
        </div>
        <div className={`'text-lg'} ${style.descriptionLanding} `}>
          <Trans i18nKey={description} ns={namespace} />
        </div>
        {exploreLink ? (
          <a
            href={exploreLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`${style.exploreButtonLanding}`}
          >
            {' '}
            <Trans i18nKey="explore" ns={namespace} />
            <RightArrowIcon />
          </a>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

const CardFinish = ({
  icon: Icon,
  title,
  description,
  exploreLink,
  namespace,
  style,
  buttonText,
}: MakeRequired<CardDataType, 'style'>) => {
  return (
    <div className={`${style.cardFinish}`}>
      <div className={style.topFinish}>
        <Icon className={`${style.iconFinish}`} />
        <Trans i18nKey={title} ns={namespace} />
      </div>
      <div className={style.contentFinish}>
        <div className={` 'text-lg'} ${style.descriptionFinish} `}>
          <Trans i18nKey={description} ns={namespace} />
        </div>
        {exploreLink ? (
          <Button
            buttonStyle="solid"
            className={`${style.exploreButtonFinish}`}
          >
            {buttonText}
          </Button>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

export const Card = (props: CardDataType) => {
  return (
    <>
      {props.appearance === 'landing' ? (
        <CardLanding {...props} style={defaultStyle} />
      ) : (
        <CardFinish {...props} style={defaultStyle} />
      )}
    </>
  )
}
