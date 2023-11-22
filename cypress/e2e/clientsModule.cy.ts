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
describe('Clients Index', () => {  
  it("Should access to clients module", () => {
    cy.login()
    cy.contains("span", "Clientes").click()
    cy.url().should("eq", baseUrl + "/cliente")
  })

  it("E-05: Should render registered clients", () => {
    var clientName = prompt("Indique el nombre del cliente")
    if (clientName == "") {
      clientName = "gianca santiago"
    }
    cy.login()
    cy.contains("span", "Clientes").click()
    cy.url().should("eq", baseUrl + "/cliente")
    cy.contains("a", `${clientName}`)
  })
})