import { StepTemplate } from './Step.template'
import { LayoutTemplate } from './Layout.template'
import { ThemesManager } from '../../../../themes/ThemesManager'
import { StepWithProgress } from './StepWithProgress'

//register automatically activate default theme

ThemesManager.getInstance().registerTheme('default', {
  tailwindConfig: './tailwind.config.js',
  stepTemplate: StepTemplate,
  layoutTemplate: LayoutTemplate,
  stepWithProgressTemplate: StepWithProgress,
})

ThemesManager.getInstance().setActiveTheme('default')
