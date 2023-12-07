import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from 'app/app'

import 'components/templates/themes/defaultTheme'
import { ThemesManager } from './components'

ThemesManager.getInstance().setActiveTheme('default')

ReactDOM.createRoot(document.getElementById('root') as Element).render(
  <React.StrictMode>{<App />}</React.StrictMode>
)
