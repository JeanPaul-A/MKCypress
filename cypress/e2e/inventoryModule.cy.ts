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

describe('Inventory Index', () => {
  it("E-37: Should access to inventory module", () => {
    cy.login()
    cy.contains("span", "Inventario").click()
    cy.url().should("eq", baseUrl + "/inventario/general")
  })

  it("E-37: Should render registered products", () => {
    cy.login()

    cy.contains("span", "Inventario").click()
    cy.get("#kt_datatable").should("be.visible")
  })

  it("E-38: Should redirect to inventory of exits", () => {
    cy.login()

    cy.contains("span", "Inventario").click()
    cy.contains("a", "Salida").click()

    cy.url().should("eq", baseUrl + "/inventario/salida")
  })

  it("E-39: Should redirect to inventory of entries", () => {
    cy.login()

    cy.contains("span", "Inventario").click()
    cy.contains("a", "Entrada").click()

    cy.url().should("eq", baseUrl + "/inventario/entrada")
  })

  it("E-40: Should redirect to general inventory", () => {
    cy.login()

    cy.contains("span", "Inventario").click()
    cy.contains("a", "Salida").click()
    cy.contains("a", "General").click()

    cy.url().should("eq", baseUrl + "/inventario/general")
  })

  function getColorText(selector: any) {
    return cy.get(selector).invoke('css', 'color');
  }

  it("E-41: Should paint green when stock is in good level", () => {
    cy.login()
    cy.contains("span", "Inventario").click()
    getColorText('.text-success').then(color => {
      cy.log(`El color del texto es: ${color}`);
    });

    cy.url().should("eq", baseUrl + "/inventario/general")
  })

  it("E-42: Should paint red when stock is low", () => {
    cy.login()
    cy.contains("span", "Inventario").click()
    getColorText('.text-danger').then(color => {
      cy.log(`El color del texto es: ${color}`);
    });
    cy.url().should("eq", baseUrl + "/inventario/general")
  })
})
