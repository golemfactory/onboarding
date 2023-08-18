//We follow presentational and container component pattern
//This is the container component for the onboarding step
//It is responsible for the launching logic

import { useContext } from 'react'
import { useActor } from '@xstate/react'
import { OnboardingContext } from 'app/app'
import { mapStateToComponent } from 'state/mapStateToComponent'
import { Commands } from 'state/commands'

export const OnboardingContainer = () => {
  const { service } = useContext(OnboardingContext)

  //@ts-ignore

  const [state, send] = useActor(service)

  const StepToRender = mapStateToComponent(state.value)

  return <StepToRender onConfirm={() => send(Commands.NEXT)} />
}
