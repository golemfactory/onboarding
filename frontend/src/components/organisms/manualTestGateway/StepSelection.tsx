import React from 'react'
import { SkippableStepType, SkippableStep } from 'state/steps'

export const SkipStepSelection = ({
  handleStepToggle,
  ignoredSteps,
}: {
  handleStepToggle: (step: SkippableStepType) => void
  ignoredSteps: SkippableStepType[]
}) => {
  return (
    <div className="w-100">
      <h2 className="text-xl font-semibold mb-4">Choose Steps to Ignore:</h2>
      <div className="flex flex-wrap">
        {Object.values(SkippableStep).map((step) => (
          <label key={step} className="flex items-center mr-4 mb-2">
            <input
              type="checkbox"
              value={step}
              checked={ignoredSteps.includes(step)}
              onChange={() => handleStepToggle(step)}
              className="mr-2 rounded-md"
            />
            {step}
          </label>
        ))}
      </div>
    </div>
  )
}
