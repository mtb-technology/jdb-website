describe('Chat Functionality', () => {
  beforeEach(() => {
    cy.visit('/chat')
  })

  it('should load the chat interface', () => {
    cy.get('[data-testid="chat-container"]').should('exist')
  })

  it('should handle user input', () => {
    cy.get('[data-testid="chat-input"]')
      .should('exist')
      .type('Test message{enter}')

    cy.get('[data-testid="chat-messages"]')
      .should('contain', 'Test message')
  })

  it('should maintain chat history', () => {
    const messages = ['First message', 'Second message']

    messages.forEach(message => {
      cy.get('[data-testid="chat-input"]')
        .type(`${message}{enter}`)

      cy.get('[data-testid="chat-messages"]')
        .should('contain', message)
    })
  })
}) 