import { useTheme } from 'components/providers/ThemeProvider'
import globalStyle from 'styles/global.module.css'
import pageStyle from './unsupported.module.css'
import { Button, Trans } from 'components/atoms'
import { DesktopIcon } from 'components/atoms/icons/desktop.icon'
import { useNavigate } from 'react-router-dom'

const style = {
  ...globalStyle,
  ...pageStyle,
}

export const UnsupportedPage = () => {
  const navigate = useNavigate()
  const theme = useTheme()
  const LayoutTemplate = theme.getLayoutTemplate()
  return (
    <LayoutTemplate
      main={
        <div className="flex flex-col gap-8 col-span-12 text-center mt-24">
          <div className={style.title}>
            <Trans i18nKey="title" ns="unsupported" />
          </div>
          <div className={`${style.card} flex flex-col gap-6`}>
            <div className="w-full flex justify-center">
              <DesktopIcon />
            </div>
            <div className="flex flex-col gap-4">
              <div className={style.subtitle}>
                <Trans i18nKey="subtitle" ns="unsupported" />
              </div>
            </div>
            <div className={`${style.description}`}>
              <Trans i18nKey="message" ns="unsupported" />
            </div>
            <div className={`${style.footerText}`}>
              <Trans i18nKey="footer" ns="unsupported" />
            </div>
            <div className="grid grid-cols-4">
              <Button
                buttonStyle="outline"
                className="col-span-2 col-start-2"
                onClick={() => {
                  navigate('/')
                }}
                useDefault={true}
              >
                <Trans i18nKey="button" ns="unsupported" />
              </Button>
            </div>
          </div>
        </div>
      }
    />
  )
}

console.log('U', UnsupportedPage)
