import style from './bulletCircle.module.css'

export const BulletCircle = () => {
  return (
    <div className={style.circle}>
      <div className={style.dotsContainer}>
        <img src="InternalDot.svg" className={style.internalDot} />
        <img src="ExternalDot.svg" className="absolute" />
      </div>
    </div>
  )
}
