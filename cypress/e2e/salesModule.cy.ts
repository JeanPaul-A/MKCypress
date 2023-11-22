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

describe('Sales Index', () => {
  it("E-43: Should access to sales module", () => {
    cy.login()
    cy.contains("span", "Ventas").click()
    cy.url().should("eq", baseUrl + "/ventas")
  })

  it("E-44: Should filter sales by time", () => {
    cy.login()
    cy.contains("span", "Ventas").click()
    cy.get("input[name='inicio']").type("2023-08-15")
    cy.get("input[name='hasta']").type("2023-12-15")
    cy.contains("a", "Buscar").click()
    cy.get("tr").eq(1).should("be.visible")
  })

  it("E-45: Should appears a text if there's not sell in range of time", () => {
    cy.login()
    cy.contains("span", "Ventas").click()
    cy.get("input[name='inicio']").type("2023-03-15")
    cy.get("input[name='hasta']").type("2023-12-15")
    cy.get("button[title='Todos']").click()
    cy.contains("a", "Karla").click()
    cy.contains("a", "Buscar").click()
    cy.get("h1").contains("no se encontraron ventas que mostrar").should("be.visible")
  })

})

describe("Sales Create", () => {
  it("E-50: Should redirect to the page to make a sale", () => {
    cy.login()
    cy.contains("span", "Ventas").click()
    cy.contains("a", "Nueva venta").click()
    cy.url().should("eq", baseUrl + "/ventas/create")
  })

  it.only("E-51: Should make a sale", () => {
    cy.viewport(1920, 1080);
    cy.login()
    cy.contains("span", "Ventas").click()
    cy.contains("a", "Nueva venta").click()
    cy.contains("button", "Go!").eq(0).click()
    cy.wait(1000)
    cy.contains("button", "Seleccionar").click()
    cy.get("button.close").click()
    cy.wait(1000)
    cy.get("select[name='canal']").select("WhatsApp")
    const product1 = cy.get("a.btn-light-success").eq(2)
    product1.click()
    product1.click()
    cy.get("a.btn-info").eq(2).click()
    cy.contains("a", "Agregar").click()
    const product2 = cy.get("a.btn-light-success").eq(4)
    product2.click()
    cy.get("a.btn-info").eq(3).click()
    cy.contains("a", "Agregar").click()
    cy.get("button#dropdownMetodo").click()
    cy.contains("a", "Deposito").click()
    cy.get("button#dropdownBanco").click()
    cy.contains("a", "Interbank").click()
    cy.contains("button", "Ingresar").click()
    cy.get('.alert').contains("Se ingreso la venta")
  })

  it("E-52: Should appears an advice if there are empty inputs", () => {
    cy.login()
    cy.contains("span", "Ventas").click()
    cy.contains("a", "Nueva venta").click()
    cy.get("select[name='canal']").select("WhatsApp")
    cy.get("button#dropdownMetodo").click()
    cy.contains("a", "Deposito").click()
    cy.get("button#dropdownBanco").click()
    cy.contains("a", "Interbank").click()
    cy.contains("button", "Ingresar").click()
    cy.get('.alert').contains("Seleccione al cliente")
  })

  it("E-53: Should appears an advice if there's not stock", () => {
    cy.viewport(1920, 1080);
    cy.login()
    cy.contains("span", "Ventas").click()
    cy.contains("a", "Nueva venta").click()
    const product1 = cy.get("a.btn-light-success").eq(0)
    product1.click()
    product1.click()
    cy.get("a.btn-info").eq(0).click()

    cy.get('.alert').contains("La cantidad excede el stock actual")
  })
})
