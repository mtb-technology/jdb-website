/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to check if element is visible and in viewport
       */
      isVisibleInViewport(selector: string): Chainable<Element>
      /**
       * Custom command to test responsive design
       */
      testResponsive(sizes: ('mobile' | 'tablet' | 'desktop')[]): void
    }
  }
}

Cypress.Commands.add('isVisibleInViewport', (selector: string) => {
  cy.get(selector).should('be.visible').and('be.inViewport')
})

Cypress.Commands.add('testResponsive', (sizes) => {
  const viewports = {
    mobile: [375, 667],
    tablet: [768, 1024],
    desktop: [1280, 800],
  }

  sizes.forEach((size) => {
    const [width, height] = viewports[size]
    cy.viewport(width, height)
    cy.wait(200) // Wait for any resize events to settle
  })
})

export { }
