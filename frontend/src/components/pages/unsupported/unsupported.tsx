import { useTheme } from 'components/providers/ThemeProvider'
import globalStyle from 'styles/global.module.css'
import pageStyle from './unsupported.module.css'
import { Trans } from 'components/atoms'
import { DesktopIcon } from 'components/atoms/icons/desktop.icon'

const style = {
  ...globalStyle,
  ...pageStyle,
}

export const UnsupportedPage = () => {
  const theme = useTheme()
  const LayoutTemplate = theme.getLayoutTemplate()
  return (
    <LayoutTemplate
      header={<button> get GLM</button>}
      main={
        <div className="flex flex-col gap-8 col-span-12 text-center mt-24">
          <div className={style.title}>
            <Trans i18nKey="title" ns="unsupported" />
          </div>
          <div className={`${style.card} flex flex-col gap-6`}>
            <div className="w-full flex justify-center">
              <DesktopIcon />
            </div>
            <div className={`${style.subtitle} flex flex-col gap-4`}>
              <Trans i18nKey="subtitle" ns="unsupported" />
            </div>
          </div>
        </div>
      }
    />
  )
}

console.log('U', UnsupportedPage)
