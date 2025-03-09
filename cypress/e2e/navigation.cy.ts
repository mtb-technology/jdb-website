describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should navigate to main pages', () => {
    // Test homepage loads
    cy.url().should('eq', 'http://localhost:3000/')

    // Test navigation to How it works
    cy.get('a[href="/hoe-werkt-het"]').click()
    cy.url().should('include', '/hoe-werkt-het')

    // Test navigation to About us
    cy.get('a[href="/over-ons"]').click()
    cy.url().should('include', '/over-ons')

    // Test navigation to Find an advisor
    cy.get('a[href="/vind-een-adviseur"]').click()
    cy.url().should('include', '/vind-een-adviseur')
  })

  it('should handle 404 pages correctly', () => {
    cy.visit('/non-existent-page', { failOnStatusCode: false })
    cy.get('h1').should('contain', '404')
  })
}) 