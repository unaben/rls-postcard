describe("Authentication", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("shows the login form on the home page", () => {
    cy.get("input#email").should("exist");
    cy.get("input#password").should("exist");
    cy.contains("Sign In").should("exist");
  });

  it("shows validation errors on empty submit", () => {
    cy.contains("Sign In").click();
    cy.contains("Email is required").should("be.visible");
    cy.contains("Password is required").should("be.visible");
  });

  it("shows error on wrong credentials", () => {
    cy.get("input#email").type("wrong@email.com");
    cy.get("input#password").type("wrongpassword");
    cy.contains("Sign In").click();
    cy.contains("Invalid email or password").should("be.visible");
  });

  it.only("redirects to /create on successful login", () => {
    cy.fixture("users").then((users) => {
      cy.get("input#email").type(users.alice.email);
      cy.get("input#password").type(users.alice.password);
      cy.contains("Sign In").click();
      cy.url().should("include", "/create");
    });
  });

  it("redirects to login if visiting /create unauthenticated", () => {
    cy.visit("/create");
    cy.url().should("eq", Cypress.config().baseUrl + "/");
  });

  it("redirects to login if visiting /postcards unauthenticated", () => {
    cy.visit("/postcards");
    cy.url().should("eq", Cypress.config().baseUrl + "/");
  });
});
