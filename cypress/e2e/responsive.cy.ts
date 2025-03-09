describe('Responsive Design', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should adapt layout for different screen sizes', () => {
    cy.testResponsive(['mobile', 'tablet', 'desktop'])

    // Test navigation menu behavior
    cy.viewport('iphone-x')
    cy.get('[data-testid="mobile-menu-button"]').should('be.visible')

    cy.viewport('macbook-13')
    cy.get('[data-testid="desktop-nav"]').should('be.visible')
  })

  it('should maintain readability across devices', () => {
    const textElements = [
      'h1',
      'p',
      '[data-testid="main-content"]'
    ]

    cy.testResponsive(['mobile', 'tablet', 'desktop'])

    textElements.forEach(element => {
      cy.get(element).should('be.visible')
    })
  })

  it('should handle touch interactions on mobile', () => {
    cy.viewport('iphone-x')

    // Test mobile-specific interactions
    cy.get('[data-testid="mobile-menu-button"]')
      .trigger('touchstart')
      .trigger('touchend')

    cy.get('[data-testid="mobile-nav"]').should('be.visible')
  })
}) 