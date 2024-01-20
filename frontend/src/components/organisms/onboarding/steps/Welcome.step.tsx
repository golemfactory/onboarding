// components/welcome/intro.tsx
import { MouseEventHandler } from 'react'
import { TooltipProvider } from 'components/providers/Tooltip.provider'
import {
  EyeIcon,
  VariableIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/outline'
import {
  RecommendationCard,
  CustomRecommendationCard,
} from 'components/molecules'

// const variants = {
//   show: { opacity: 1 },
//   hidden: { opacity: 0 },
// }

TooltipProvider.registerTooltip({
  id: 'welcome',
  tooltip: {
    sections: ['explainGLM', 'explainMATIC', 'explainFees', 'explainOffRamp'],
  },
})

const RecommendationCards = [
  {
    usageTime: 22,
    description: 'playAround.description',
    Icon: <EyeIcon className="w-6 h-6 text-primary" />,
    title: 'playAround.title',
  },
  {
    usageTime: 55,
    description: 'compute.description',
    Icon: <VariableIcon className="w-6 h-6 text-primary" />,
    title: 'compute.title',
  },
  {
    usageTime: 110,
    description: 'ambitious.description',
    Icon: <AcademicCapIcon className="w-6 h-6 text-primary" />,
    title: 'ambitious.title',
  },
].map((card) => ({
  ...card,
  onClick: () => {
    console.log('onClick', this)
  },
}))

const WelcomePresentational = ({
  onConfirm,
}: {
  onConfirm: MouseEventHandler
}) => {
  return (
    <div className="grid grid-cols-12 col-span-12 gap-3">
      {RecommendationCards.map(RecommendationCard)}
      <CustomRecommendationCard />
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
