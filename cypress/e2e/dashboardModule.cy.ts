import "cypress-file-upload"
import "../support/commands"

declare global {
  namespace Cypress {
    interface Chainable {
      login(): Chainable<void>
    }
  }
}
beforeEach(() => {
  cy.visit("/");
})

var baseUrl = Cypress.config().baseUrl;

describe('Dashboard Index', () => {
  it("Should access to dashboard module", () => {
    cy.login()
    cy.url().should("eq", baseUrl + "/dashboard")
  })

  it("E-46: Should render prospects metrics", () => {
    cy.login()
    cy.wait(3000)
    cy.get("#chart_2").should("be.visible")
  })

  it("E-47: Should render total sales per month metrics", () => {
    cy.login()
    cy.wait(3000)
    cy.get("#chart_1").should("be.visible")
  })

  it("E-48: Should render total sales per categories", () => {
    cy.login()
    cy.wait(3000)
    cy.get("#chart_13").should("be.visible")
  })

  it("E-49: Should render total sales per categories", () => {
    cy.login()
    cy.wait(3000)
    cy.get("#chart_12").should("be.visible")
  })
})
