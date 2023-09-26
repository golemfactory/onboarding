import style from './ProgressBar.module.css'

const getStyle = (isCompleted: boolean, isCurrent: boolean) => {
  if (isCompleted) {
    return style.completed
  } else if (isCurrent) {
    return style.current
  } else {
    return style.uncompleted
  }
}

const Step = ({
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
  index: number
}) => {
  return (
    <div style={{ top: '10px' }}>
      <li
        className={`${style.progressBarItem} ${getStyle(
          isCompleted,
          isCurrent
        )} `}
      >
        <span className={`${style.progressBarCircle}`}>{index}</span>

        <span>
          <h3 className="font-medium leading-tight">{title}</h3>
          <p className="text-sm">{message} </p>
        </span>
      </li>
    </div>
  )
}

export const ProgressBar = ({ category }: { category: any }) => {
  return (
    <div style={{ position: 'fixed', top: '40px' }}>
      <ol className={style.progressBarContainer}>
        <Step
          title="Wallet "
          message="You need to have a wallet installed"
          isCompleted={
            category.value === 'matic' ||
            category.value === 'glm' ||
            category.value === 'final'
          }
          isCurrent={category.value === 'wallet'}
          index={1}
        />
        <Step
          title="Gas"
          message="You need to acquire matic for gas"
          isCompleted={category.value === 'glm' || category.value === 'final'}
          isCurrent={category.value === 'matic'}
          index={2}
        />
        <Step
          title="GLM"
          message="Finally GLM token is needed "
          isCompleted={category.value === 'final'}
          isCurrent={category.value === 'glm'}
          index={3}
        />
      </ol>
    </div>
  )
}
