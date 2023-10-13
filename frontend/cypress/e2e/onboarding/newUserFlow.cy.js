context('NewUserFlow', () => {
  before(() => {
    cy.visit('http://localhost:5173/onboarding')
  })
  it('should have a proper title', () => {
    cy.title().should('eq', 'Golem onboarding')
  })

  it('should have a proper header', () => {
    cy.get('h1').should('contain', 'Welcome to Golem!')
  })

  it('should go to next step on get started click', () => {
    cy.clickNextStepButton()
  })
})
