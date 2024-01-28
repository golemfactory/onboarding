import { getStepDetails } from './getStepRenderDetails'
import { useTheme } from 'components/providers/ThemeProvider'
import { useOnboarding } from 'hooks/useOnboarding'
import { useEffect, useState } from 'react'

import { motion } from 'framer-motion'

export const OnboardingPage = () => {
  const theme = useTheme()

  const LayoutTemplate = theme.getLayoutTemplate()
  const StepTemplate = theme.getStepTemplate()

  const { state } = useOnboarding()

  console.log('rerender onboarding page')
  return (
    <>
      <LayoutTemplate>
        <StepTemplate
          //@ts-ignore
          {...getStepDetails(state.value)}
        />
      </LayoutTemplate>
    </>
  )
}
