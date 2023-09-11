import styles from './hyperlink.module.css'

export const HyperLink = ({
  link,
  text,
  target = '_blank',
  className = styles.hyperlink,
  ...rest
}: {
  link: string
  text: string
  target?: string
  className?: string
}) => {
  const combinedClassName = ` ${className || ''} ${styles.hyperlink}`.trim()

  return (
    <a target={target} className={combinedClassName} {...rest} href={link}>
      {text}
    </a>
  )
}
