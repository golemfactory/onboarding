import React from 'react'
import { OnRamp } from './OnRamp.step'

describe('<OnRamp />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<OnRamp />)
  })
})