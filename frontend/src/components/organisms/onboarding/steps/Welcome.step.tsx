// components/welcome/intro.tsx
import { motion } from 'framer-motion'
import { MouseEventHandler } from 'react'
import onboardingStyle from '../Onboarding.module.css'
import { TooltipProvider } from 'components/providers/Tooltip.provider'
import { InfoTooltip } from 'components/organisms/tooltip/InfoTooltip'

const variants = {
  show: { opacity: 1 },
  hidden: { opacity: 0 },
}

TooltipProvider.registerTooltip({
  id: 'welcome',
  tooltip: {
    sections: ['explainGLM', 'explainMATIC', 'explainFees', 'explainOffRamp'],
  },
})

const WelcomePresentational = ({
  onConfirm,
}: {
  onConfirm: MouseEventHandler
}) => {
  return (
    <div className="grid grid-cols-12 gap-8 col-span-12">
      <div className="col-span-12">{/* <InfoTooltip id={'welcome'} /> */}</div>
    </div>
  )
}

export const Welcome = ({ goToNextStep }: { goToNextStep: () => void }) => {
  console.log('Welcome render')
  return (
    <WelcomePresentational
      onConfirm={() => {
        goToNextStep()
      }}
    />
  )
}
