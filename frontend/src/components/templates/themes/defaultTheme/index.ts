import { StepTemplate } from './Step.template'
import { LayoutTemplate } from './Layout.template'
import { ThemesManager } from '..'

ThemesManager.getInstance().registerTheme('default', {
  primaryColor: 'golemblue',
  stepTemplate: StepTemplate,
  layoutTemplate: LayoutTemplate,
})
