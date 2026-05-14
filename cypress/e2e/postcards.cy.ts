describe("Postcards", () => {
  beforeEach(() => {
    cy.fixture("users").then((users) => {
      cy.visit("/");
      cy.get("input#email").type(users.alice.email);
      cy.get("input#password").type(users.alice.password);
      cy.contains("Sign In").click();
      cy.url().should("include", "/create");
    });
  });

  it("shows the create form after login", () => {
    cy.contains("Craft your message").should("be.visible");
  });

  it("shows validation errors on empty postcard submit", () => {
    cy.contains("Send Postcard").click();
    cy.contains("Title is required").should("be.visible");
    cy.contains("Content is required").should("be.visible");
  });

  it("creates a postcard and redirects to list", () => {
    cy.get("input#title").type("My Cypress test card");
    cy.get("textarea#content").type("Written by a cypress test.");
    cy.contains("Send Postcard").click();
    cy.url().should("include", "/postcards");
    cy.contains("My Cypress test card").should("be.visible");
  });

  it("shows edit and delete buttons only on own cards", () => {
    cy.visit("/postcards");
    cy.get("[aria-label='Edit postcard']").should("exist");
    cy.get("[aria-label='Delete postcard']").should("exist");
  });

  it("can navigate to create page from postcards list", () => {
    cy.visit("/postcards");
    cy.contains("+ New").click();
    cy.url().should("include", "/create");
  });

  it("signs out and redirects to login", () => {
    cy.visit("/postcards");
    cy.contains("Sign out").click();
    cy.url().should("eq", Cypress.config().baseUrl + "/");
  });
});

describe("Unauthorized Access Redirection", () => {
  it("redirects unauthenticated users from /postcards to the homepage", () => {
    cy.visit("/postcards");
    cy.url().should("eq", Cypress.config().baseUrl + "/");
  });

  it("redirects unauthenticated users from /create to the homepage", () => {
    cy.visit("/create");
    cy.url().should("eq", Cypress.config().baseUrl + "/");
  });
});
