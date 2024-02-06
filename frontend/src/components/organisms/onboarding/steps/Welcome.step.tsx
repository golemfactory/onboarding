// components/welcome/intro.tsx
import { TooltipProvider } from 'components/providers/Tooltip.provider'
import {
  EyeIcon,
  VariableIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/outline'
import { BudgetCard, CustomRecommendationCard } from 'components/molecules'
import { useOnboarding } from 'hooks/useOnboarding'
import { BudgetOption } from 'types/dataContext'
import { Commands } from 'state/commands'
import { Trans } from 'components/atoms'
import welcomeStepStyle from './Welcome.step.module.css'
import { Legal } from 'components/molecules/legal/Legal'
import { AnimatePresence, motion } from 'framer-motion'

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

const BudgetCards = [
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
  goToNextStep,
}: {
  setIsCompleted: (isCompleted: boolean) => void
  shouldCheckLegal: boolean
  goToNextStep: () => void
}) => {
  const { state, send } = useOnboarding()
  window.gtns = goToNextStep

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{
          opacity: 0,
        }}
        transition={{
          duration: 1,
        }}
        className="grid xl:grid-cols-12 grid-cols-6 col-span-12 gap-3 "
      >
        {/* cards */}
        {BudgetCards.map((card) => {
          return {
            ...card,
            selectBudget: () => {
              send({ type: Commands.SELECT_BUDGET, payload: card.id })
            },
            selected: state.context.budget === card.id,
          }
        }).map(BudgetCard)}
        <CustomRecommendationCard
          selectBudget={() => {
            send({ type: Commands.SELECT_BUDGET, payload: BudgetOption.CUSTOM })
          }}
          selected={state.context.budget === BudgetOption.CUSTOM}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{
          opacity: 0,
        }}
        transition={{
          duration: 1,
        }}
        className={`${style.disclaimer} `}
      >
        <Trans i18nKey="disclaimer" ns="welcome.step" />
      </motion.div>
      <Legal
        setIsCompleted={setIsCompleted}
        shouldCheckLegal={shouldCheckLegal}
      />
    </>
  )
}

export const Welcome = ({
  goToNextStep,
  setIsCompleted,
  isNextCalled,
}: {
  goToNextStep: () => void
  setIsCompleted: (isCompleted: boolean) => void
  isNextCalled: boolean
}) => {
  return (
    <WelcomePresentational
      goToNextStep={goToNextStep}
      setIsCompleted={setIsCompleted}
      shouldCheckLegal={isNextCalled}
    />
  )
}
