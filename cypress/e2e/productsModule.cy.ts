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

var newProduct = prompt("Ingresa el nombre del producto a crear")
var newVariety = prompt("Ingresa el nuevo nombre de la variedad")
var baseUrl = Cypress.config().baseUrl;

describe('Products Index', () => {
  it("Should access to products module", () => {
    cy.login()
    cy.contains("span", "Productos").click()
    cy.url().should("eq", baseUrl + "/productos")
  })

  it("E-06: Should render registered products", () => {
    var productName = prompt("Indique el nombre del producto")
    if (productName == "") {
      productName = "licencia de visio"
    }
    cy.login()
    cy.contains("span", "Productos").click()
    cy.url().should("eq", baseUrl + "/productos")
    cy.contains("span", `${productName}`)
  })

  it("E-07: Should render extra options per product", () => {
    cy.login()
    cy.contains("span", "Productos").click()
    cy.get("button[data-toggle='dropdown']").eq(2).click()
    cy.wait
    cy.contains("a", "Editar")
    cy.contains("a", "Publicar")
  })

  it("E-08: Should render extra options in product module", () => {
    cy.login()
    cy.contains("span", "Productos").click()
    cy.wait(1000)
    cy.contains("a", "Almacen")
    cy.contains("a", "Nuevo producto")
  })
})

describe("Products Create", () => {
  it("E-09: Should access to create products", () => {
    cy.login()
    cy.contains("span", "Productos").click()
    cy.contains("a", "Nuevo producto").click()
    cy.url().should("eq", baseUrl + "/productos/create")
  })

  it("E-10: Should render form to create a new product", () => {
    cy.login()
    cy.contains("span", "Productos").click()
    cy.contains("a", " Nuevo producto ").click()
    cy.get("input[name='titulo'")
    cy.get("button[title='Seleccionar'")
    cy.get("select[name='tipo'")
    cy.get("input[name='tipo_variedad'")
    cy.get("textarea[name='descripcion'")
    cy.get("input[name='profile_avatar']")
  })


  it("E-11: Should create a new product", () => {
    cy.login()
    cy.contains("span", "Productos").click()
    cy.contains("a", " Nuevo producto ").click()
    cy.get("input[name='titulo'").type(`${newProduct}`)
    cy.get("button[title='Seleccionar'").click()
    cy.contains("span", "Oficina").click()
    cy.get("select[name='tipo'").select("Fisico")
    cy.get("input[name='tipo_variedad'").type("Color")
    cy.get("textarea[name='descripcion'").type("Producto para realizar prueba e2e")
    cy.get("input[name='profile_avatar']").attachFile("ProductoPrueba.jpeg")
    cy.contains("button", "Crear").click()

    cy.url().should("eq", baseUrl + "/productos")
    cy.wait(2000)
    cy.contains("span", `${newProduct}`).should("exist")
  })

  it("E-12: Should appears an advice if there are empty inputs", () => {
    cy.login()
    cy.contains("span", "Productos").click()
    cy.contains("a", " Nuevo producto ").click()
    cy.get("input[name='titulo'").type("Nuevo producto")
    cy.contains("button", "Crear").click()

    cy.get('.alert').contains("Debe")
  })

  it("E-13: Should appears an advice if product's name already exists", () => {
    var productName = prompt("Indique el nombre del producto")
    if (productName == "") {
      productName = "TARJETA NVIDIA 1660"
    }
    cy.login()
    cy.contains("span", "Productos").click()
    cy.contains("a", " Nuevo producto ").click()
    cy.get("input[name='titulo'").type(`${productName}`)
    cy.get("button[title='Seleccionar'").click()
    cy.contains("span", "Oficina").click()
    cy.get("select[name='tipo'").select("Fisico")
    cy.get("input[name='tipo_variedad'").type("Color")
    cy.get("textarea[name='descripcion'").type("Producto para realizar prueba e2e")
    cy.get("input[name='profile_avatar']").attachFile("ProductoPrueba.jpeg")
    cy.contains("button", "Crear").click()

    cy.get('.alert').contains("Ya existe un producto con ese titulo")
  })

  it("E-14: Should return to product index if Regresar button is pressed", () => {
    cy.login()
    cy.contains("span", "Productos").click()
    cy.contains("a", " Nuevo producto ").click()
    cy.contains("button", "Regresar").click()
    cy.url().should("contain", baseUrl + "/productos")
  })
})

describe("Products Edit", () => {
  it("E-15: Should redirect to the page to edit a product", () => {
    cy.login()
    cy.contains("span", "Productos").click()
    cy.get("button[data-toggle='dropdown']").eq(2).click()
    cy.contains("a", "Editar").click()
    cy.url().should("contain", "/productos/edit")
  })

  it("E-16: Should render form to edit a product", () => {
    cy.login()
    cy.contains("span", "Productos").click()
    cy.get("button[data-toggle='dropdown']").eq(2).click()
    cy.contains("a", "Editar").click()
    cy.get("input[name='titulo'").first().should("exist")
    cy.get("select[name='categoria'").should("exist")
    cy.get("select[name='categoria'").should("exist")
    cy.get("select[name='tipo'").should("exist")
    cy.get("input[name='tipo_variedad'").should("exist")
    cy.get("textarea[name='descripcion'").should("exist")
    cy.get("input[name='profile_avatar'").should("exist")
  })

  it("E-17: Should edit a product", () => {
    newProduct = prompt("Ingresa el nuevo nombre de producto")
    cy.login()
    cy.contains("span", "Productos").click()
    cy.get("button[data-toggle='dropdown']").eq(2).click()
    cy.contains("a", "Editar").click()
    cy.get("input[name='titulo'").first().clear().type(`${newProduct}`)
    cy.contains("button", "Actualizar").click()
    cy.wait(2000)
    cy.contains("span", "Productos").click()
    cy.url().should("eq", baseUrl + "/productos")
    cy.contains("span", `${newProduct}`).should("exist")
  })

  it("E-18: Should appears an advice if a product's attribute is empty", () => {
    cy.login()
    cy.contains("span", "Productos").click()
    cy.get("button[data-toggle='dropdown']").eq(2).click()
    cy.contains("a", "Editar").click()
    cy.get("input[name='tipo_variedad'").first().clear()
    cy.contains("button", "Actualizar").click()
    cy.get('.alert').contains("Debe ingresar el tipo de variedad")
  })
})

describe("Products' State", () => {
  it("E-19: Should render a modal of confirmation to change state", () => {
    cy.login()
    cy.contains("span", "Productos").click()
    cy.get("button[data-toggle='dropdown']").eq(2).click()
    cy.wait(1000)
    cy.contains("a", "Publicar").first().click()
    cy.wait(1000)
    cy.get("div[class='modal-dialog']").should("exist")
  })

  it("E-20: Should edit state if the modal is confirmed", () => {
    cy.login()
    cy.contains("span", "Productos").click()
    cy.get("button[data-toggle='dropdown']").eq(2).click()
    cy.wait(1000)
    cy.contains("a", "Publicar").click()
    cy.wait(1000)
    cy.contains("button", "Enviar").click()
    cy.wait(1000)
    cy.get("button[data-toggle='dropdown']").eq(2).click()
    cy.wait(1000)
    cy.contains("a", "Borrador")
  })
})


describe("Products' Variety", () => {
  it("E-25: Should render a list of product's variety", () => {
    cy.login()
    cy.contains("span", "Productos").click()
    cy.get("button.btn-clean").first().click()
    cy.contains("a", "Editar").first().click()

    cy.contains("th", "SKU").should("exist")
  })

  it("E-54: Should exist an input for minimun stock", () => {
    cy.login()
    cy.contains("span", "Productos").click()
    cy.get("button.btn-clean").first().click()
    cy.contains("a", "Editar").first().click()
    cy.get("input[name='stockMinimo']").should("be.visible")
  })

  it("E-21: Should create a product variety", () => {
    cy.login()
    cy.contains("span", "Productos").click()
    cy.get("button.btn-clean").first().click()
    cy.contains("a", "Editar").first().click()

    cy.get("input[name='titulo']").eq(1).type(`${newVariety}`)

    cy.get("input[name='stockMinimo']").type("10")
    cy.contains("button", "Generar!").click()
    cy.contains("button", " Agregar ").click()

    cy.wait(2000)
    cy.contains("span", `${newVariety}`).should("exist")
  })

  it("E-22: Should appears an advice if form isn't complete", () => {
    cy.login()
    cy.contains("span", "Productos").click()
    cy.get("button.btn-clean").first().click()
    cy.contains("a", "Editar").first().click()

    cy.contains("button", " Agregar ").click()

    cy.get('.alert').contains("Debe ingresar el titulo de variedad")
  })

  it("E-23: Should generate SKU", () => {
    cy.login()
    cy.contains("span", "Productos").click()
    cy.get("button.btn-clean").first().click()
    cy.contains("a", "Editar").first().click()

    cy.get("input[name='titulo']").eq(1).type("A")

    cy.contains("button", "Generar!").click()

    cy.get("input[name='projectname']").should("have.value", "F-PRO-COL-A")
  })

  it("E-24: Should appears an advice if variety's name is empty", () => {
    cy.login()
    cy.contains("span", "Productos").click()
    cy.get("button.btn-clean").first().click()
    cy.contains("a", "Editar").first().click()

    cy.get("input[name='titulo']").eq(1).clear()

    cy.contains("button", "Generar!").click()

    cy.get('.alert').contains("Debe ingresar el titulo de variedad")
  })

  it("E-26: Should render a delete button per each variety product", () => {
    cy.login()
    cy.contains("span", "Productos").click()
    cy.get("button.btn-clean").first().click()
    cy.contains("a", "Editar").first().click()

    cy.get("a[data-toggle='modal']").should("exist")
  })

  it("E-27: Should appears a modal if delete button is pressed", () => {
    cy.login()
    cy.contains("span", "Productos").click()
    cy.get("button.btn-clean").first().click()
    cy.contains("a", "Editar").first().click()

    cy.get("a[data-toggle='modal']").first().click()
    cy.get("div[class='modal-content']").should("be.visible")
  })

  it("E-28: Should appears a modal if delete button is pressed", () => {
    cy.login()
    cy.contains("span", "Productos").click()
    cy.get("button.btn-clean").first().click()
    cy.contains("a", "Editar").first().click()

    cy.get("a[data-toggle='modal']").first().click()
    cy.contains("button", "Eliminar").click()
    cy.get(".alert").contains("Se eliminó la variedad")
  })

  it("E-55: Should exist a location code per variety", () => {
    cy.login()
    cy.contains("span", "Productos").click()
    cy.get("button.btn-clean").first().click()
    cy.contains("a", "Editar").first().click()
    cy.contains("th", "Ubicación").should("be.visible")
  })
})

describe("Add products", () => {
  it("E-29: Should appears a modal if new entry button is pressed", () => {
    cy.login()
    cy.contains("span", "Productos").click()
    cy.contains("a", "Almacen").click()
    cy.url().should("contain", baseUrl + "/productos/inventario")
    cy.contains("a", "Nuevo ingreso").click()
    cy.get("div[class='modal-content']").should("be.visible")
  })

  it("E-30: Should do a new entry of products", () => {

    cy.login()
    cy.contains("span", "Productos").click()
    cy.contains("a", "Almacen").click()
    cy.contains("a", "Nuevo ingreso").click()
    cy.get("button[title='Seleccionar']").first().click()
    cy.contains("span", `${newProduct}`).click()
    cy.get("button[title='Seleccionar']").click()
    cy.contains("span", `${newVariety}`).click()
    cy.get("input[name='costo_unidad'").type("50")
    cy.get("input[name='cantidad'").type("25")
    cy.contains("button", "Ingresar").click()
  })

  it("E-31: Should appears an advice if form isn't complete", () => {
    cy.login()
    cy.contains("span", "Productos").click()
    cy.contains("a", "Almacen").click()
    cy.contains("a", "Nuevo ingreso").click()
    cy.get("button[title='Seleccionar']").first().click()
    cy.contains("span", `${newProduct}`).click()
    cy.get("button[title='Seleccionar']").click()
    cy.contains("span", `${newVariety}`).click()
    cy.get("input[name='costo_unidad'").type("50")
    cy.contains("button", "Ingresar").click()

    cy.get(".alert").should("exist")
  })
})

describe("Search and filter products", () => {
  it("E-32: Should appears an advice if form isn't complete", () => {
    cy.login()
    cy.contains("span", "Productos").click()
    cy.url().should("contain", baseUrl + "/productos")
    cy.get("input[name='filtro_producto'").type(`${newProduct}`)
    cy.contains("a", "Buscar").click()
    cy.wait(1000)
    cy.get("span").contains(`${newProduct}`)
  })

  it("E-33: Should appears a text if name doesn't match with a registered product", () => {
    cy.login()
    cy.contains("span", "Productos").click()
    cy.url().should("contain", baseUrl + "/productos")
    cy.get("input[name='filtro_producto'").type("Producto No Existente")
    cy.contains("a", "Buscar").click()
    cy.wait(1000)
    cy.get("p").contains("No hay ningun producto que mostrar").should("be.visible")
  })

  it("E-34: Should appears all registered products if search is empty", () => {
    cy.login()
    cy.contains("span", "Productos").click()
    cy.url().should("contain", baseUrl + "/productos")
    cy.get("input[name='filtro_producto'").type("Producto No Existente")
    cy.contains("a", "Buscar").click()
    cy.wait(1000)
    cy.get("input[name='filtro_producto'").clear()
    cy.contains("a", "Buscar").click()
    cy.wait(1000)
    cy.get("span").contains(`${newProduct}`)
  })

  it("E-35: Should filter products by category", () => {
    cy.login()
    cy.contains("span", "Productos").click()
    cy.url().should("contain", baseUrl + "/productos")
    cy.contains("button", "Todos").eq(0).click()
    cy.contains("span", "Licencias").click()
    cy.contains("a", "Buscar").click()
    cy.wait(1000)
    cy.contains("span", "Producto Licencia").should("be.visible")
  })

  it("E-35: Should filter products by state", () => {
    cy.login()
    cy.contains("span", "Productos").click()
    cy.url().should("contain", baseUrl + "/productos")
    cy.get("button[title='Todos']").eq(1).click()
    cy.contains("span", "Publicados").click()
    cy.contains("a", "Buscar").click()
    cy.contains("span", `${newProduct}`).should("be.visible")
  })

  it("E-36: Should render a text if there's not a product with expected filters", () => {
    cy.login()
    cy.contains("span", "Productos").click()
    cy.url().should("contain", baseUrl + "/productos")

    cy.get("button[title='Todos']").eq(0).click()
    cy.contains("span", "Laptops").click()
    cy.get("button[title='Todos']").eq(0).click()
    cy.contains("span", "Borrador").click()
    cy.contains("a", "Buscar").click()

    cy.get("p").contains("No hay ningun producto que mostrar").should("be.visible")
  })
})