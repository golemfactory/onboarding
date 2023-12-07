import { StepTemplate } from './Step.template'
import { LayoutTemplate } from './Layout.template'
import { ThemesManager } from '../../../../themes/ThemesManager'

//register automatically activate default theme

ThemesManager.getInstance().registerTheme('default', {
  tailwindConfig: './tailwind.config.js',
  stepTemplate: StepTemplate,
  layoutTemplate: LayoutTemplate,
})

ThemesManager.getInstance().setActiveTheme('default')
