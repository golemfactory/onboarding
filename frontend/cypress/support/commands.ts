Cypress.Commands.add('clickNextStepButton', () => {
  cy.get('[data-test-id="next-step-button"]').click()
})
