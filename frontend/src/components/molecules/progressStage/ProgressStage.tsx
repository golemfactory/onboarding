import { ReactElement } from 'react'
import style from './ProgressStage.module.css'

const getStyle = (isCompleted: boolean, isCurrent: boolean) => {
  if (isCompleted) {
    return style.completed
  } else if (isCurrent) {
    return style.current
  } else {
    return style.uncompleted
  }
}

export const ProgressStage = ({
  title,
  message,
  isCompleted,
  isCurrent,
  index,
}: {
  title: string
  message: string
  isCompleted: boolean
  isCurrent: boolean
  index: ReactElement
}) => {
  return (
    <div style={{ top: '10px', minWidth: '310px' }}>
      <li
        className={`${style.progressStageItem} ${getStyle(
          isCompleted,
          isCurrent
        )} `}
      >
        <span className={`${style.progressStageCircle}`}>{index}</span>

        <span>
          <h3 className="font-medium leading-tight">{title}</h3>
          <p className="text-sm">{message} </p>
        </span>
      </li>
    </div>
  )
}
