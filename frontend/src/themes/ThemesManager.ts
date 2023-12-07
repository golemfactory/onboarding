import { FC } from 'react'
import { StepPropsType, LayoutPropsType } from 'types/ui'

type ThemeConfigurationType = {
  tailwindConfig: string
  stepTemplate: FC<StepPropsType>
  layoutTemplate: FC<LayoutPropsType>
}

export class Theme {
  private stepTemplate: FC<StepPropsType>
  private layoutTemplate: FC<LayoutPropsType>

  public constructor(configuration: ThemeConfigurationType) {
    this.stepTemplate = configuration.stepTemplate
    this.layoutTemplate = configuration.layoutTemplate
  }

  public getStepTemplate(): FC<StepPropsType> {
    return this.stepTemplate
  }

  public getLayoutTemplate(): FC<LayoutPropsType> {
    return this.layoutTemplate
  }
}

export class ThemesManager {
  //Strange thing that this eslint rules has no config to allow implementing
  //singleton pattern

  // eslint-disable-next-line no-use-before-define
  private static instance: ThemesManager
  private themes: { [name: string]: Theme } = {}
  private activeTheme?: string
  private constructor() {}

  public static getInstance(): ThemesManager {
    if (!ThemesManager.instance) {
      ThemesManager.instance = new ThemesManager()
    }
    return ThemesManager.instance
  }

  public registerTheme(
    name: string,
    configuration: ThemeConfigurationType
  ): void {
    this.themes[name] = new Theme(configuration)
  }

  public getTheme(name: string): Theme {
    return this.themes[name]
  }

  public setActiveTheme(name: string): void {
    if (this.themes[name] === undefined) {
      throw new Error(`No theme with name ${name}`)
    }
    this.activeTheme = name
  }

  public getActiveTheme(): Theme {
    if (!this.activeTheme) {
      throw new Error('No active theme')
    }

    return this.themes[this.activeTheme]
  }
}
