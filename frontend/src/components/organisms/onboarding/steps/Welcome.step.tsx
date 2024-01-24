// components/welcome/intro.tsx
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
import { useOnboarding } from 'hooks/useOnboarding'
import { BudgetOption } from 'types/dataContext'
import { Commands } from 'state/commands'
import { Trans } from 'components/atoms'
import welcomeStepStyle from './Welcome.step.module.css'
import { Legal } from 'components/molecules/legal/Legal'

const style = {
  ...welcomeStepStyle,
}

TooltipProvider.registerTooltip({
  id: 'welcome',
  tooltip: {
    sections: ['explainGLM', 'explainMATIC', 'explainFees', 'explainOffRamp'],
    appearance: 'primary',
  },
})

TooltipProvider.registerTooltip({
  id: 'matic',
  tooltip: {
    sections: ['explain'],
    appearance: 'secondary',
  },
})

const RecommendationCards = [
  {
    id: BudgetOption.PLAY_AROUND,
    Icon: EyeIcon,
  },
  {
    id: BudgetOption.COMPUTE,
    Icon: VariableIcon,
  },
  {
    id: BudgetOption.AMBITIOUS,
    Icon: AcademicCapIcon,
  },
]
const WelcomePresentational = ({
  setIsCompleted,
  shouldCheckLegal,
}: {
  setIsCompleted: (isCompleted: boolean) => void
  shouldCheckLegal: boolean
}) => {
  const { state, send } = useOnboarding()

  return (
    <div className="grid grid-cols-12 col-span-12 gap-3">
      {/* cards */}
      {RecommendationCards.map((card) => {
        return {
          ...card,
          selectBudget: () => {
            send({ type: Commands.SELECT_BUDGET, payload: card.id })
          },
          selected: state.context.budget === card.id,
        }
      }).map(RecommendationCard)}
      <CustomRecommendationCard
        selectBudget={() => {
          send({ type: Commands.SELECT_BUDGET, payload: BudgetOption.CUSTOM })
        }}
        selected={state.context.budget === BudgetOption.CUSTOM}
      />

      <div className={`${style.disclaimer} mb-16`}>
        <Trans i18nKey="disclaimer" ns="welcome.step" />
      </div>
      <Legal
        setIsCompleted={setIsCompleted}
        shouldCheckLegal={shouldCheckLegal}
      />
    </div>
  )
}

export const Welcome = ({
  setIsCompleted,
  isNextCalled,
}: {
  setIsCompleted: (isCompleted: boolean) => void
  isNextCalled: boolean
}) => {
  return (
    <WelcomePresentational
      setIsCompleted={setIsCompleted}
      shouldCheckLegal={isNextCalled}
    />
  )
}
