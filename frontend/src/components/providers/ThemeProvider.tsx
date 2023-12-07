import { PropsWithChildren, createContext, useContext, useState } from 'react'
import { ThemesManager, Theme } from '..'

const ThemeContext = createContext({} as Theme)

export const useTheme = () => {
  const context = useContext(ThemeContext)
  return context
}

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme] = useState(ThemesManager.getInstance().getActiveTheme())
  //TODO give theme manager ability to switch themes
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}
