var baseUrl = Cypress.config().baseUrl;

beforeEach(() => {
  cy.visit("/");
})

describe('Login', () => {
  it("E-01: Should access to system", () => {
    cy.get('input[name="email"]').type("gfsp2001@hotmail.com")
    cy.get('input[name="password"]').type("123456789")
    cy.get("button").click()
    cy.url().should("eq", baseUrl + "/dashboard")
  })

  it("E-02: Should appears an advice if there's no email", () => {
    cy.get('input[name="password"]').type("123456789")
    cy.get("button").click()
    cy.get('.alert').contains("Debe ingresar el correo")
  })

  it("E-02: Should appears an advice if there's no password", () => {
    cy.get('input[name="email"]').type("gfsp2001@hotmail.com")
    cy.get("button").click()
    cy.get('.alert').contains("Debe ingresar la contraseña")
  })

  it("E-03: Should appears an advice if there are no valid credentials", () => {
    cy.get('input[name="email"]').type("gfsp2001@hotmail.com")
    cy.get('input[name="password"]').type("1234567")
    cy.get("button").click()
    cy.get('.alert').contains("La contraseña es incorrecta")
  })
})

describe("Logout", () => {

  it("E-04: Should redirect to login if logout button is pressed", () => {
    cy.login()
    cy.contains("span", "Cerrar sesión").click()
    cy.url().should("eq", baseUrl + "/")
  })
})