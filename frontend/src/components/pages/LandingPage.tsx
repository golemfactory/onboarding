import { useTheme } from 'components/providers/ThemeProvider'

export const LandingPage = () => {
  const theme = useTheme()
  const LayoutTemplate = theme.getLayoutTemplate()
  return <LayoutTemplate />
}
