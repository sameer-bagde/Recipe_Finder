describe("Recipe_Finder", () => {
  const url = "http://localhost:5173";

  beforeEach(() => {
    cy.visit(url);
  });

  describe("SignupForm", () => {
    beforeEach(() => {
      cy.clearLocalStorage();
      cy.visit(`${url}/user/sign-up`);
    });

    it("successful signup", () => {
      cy.get('input[name="name"]').should("exist").type("John Doe");
      cy.get('input[name="email"]').should("exist").type("john@example.com");
      cy.get('input[name="password"]').should("exist").type("password123");
      cy.get("button").contains("Register").should("be.visible").click();

      cy.url().should("eq", `${url}/`);
      cy.window().its("localStorage.authToken").should("exist");
      cy.window().its("localStorage.userData").should("exist");
    });

    it("signup with existing email", () => {
      cy.window().then((win) => {
        win.localStorage.setItem(
          "users",
          JSON.stringify([{ email: "john@example.com" }]),
        );
      });

      cy.get('input[name="name"]').should("exist").type("John Doe");
      cy.get('input[name="email"]').should("exist").type("john@example.com");
      cy.get('input[name="password"]').should("exist").type("password123");
      cy.get("button").contains("Register").should("be.visible").click();

      cy.contains("User with this email already exists").should("be.visible");
    });
  });

  describe("SigninForm", () => {
    beforeEach(() => {
      cy.clearLocalStorage();
      cy.visit(`${url}/user/sign-in`);
    });

    it("redirects to home page on successful sign-in", () => {
      cy.window().then((win) => {
        win.localStorage.setItem(
          "users",
          JSON.stringify([
            { email: "johndoe@example.com", password: "password123" },
          ]),
        );
      });

      cy.get('input[name="email"]').type("johndoe@example.com");
      cy.get('input[name="password"]').type("password123");

      cy.get("button").contains("Sign In").click();

      cy.url().should("eq", `${url}/`);
    });

    it("shows error message if credentials are invalid", () => {
      cy.get('input[name="email"]').type("nonexistent@example.com");
      cy.get('input[name="password"]').type("wrongpassword");

      cy.get("button").contains("Sign In").click();

      cy.contains("Invalid email or password").should("be.visible");
    });
  });

  describe("Favorites", () => {
    beforeEach(() => {
      cy.clearLocalStorage();
      cy.visit(`${url}/recipe/123`);
    });

    it("adds recipe to favorites when user is authenticated", () => {
      const mockRecipeDetails = {
        id: "123",
        title: "Test Recipe",
        image: "http://example.com/image.jpg",
        summary: "<p>Test summary</p>",
        instructions: "<p>Test instructions</p>",
        extendedIngredients: [
          { id: 1, original: "Ingredient 1" },
          { id: 2, original: "Ingredient 2" },
        ],
      };

      cy.intercept("GET", "**/recipes/123/information*", mockRecipeDetails).as(
        "getRecipeDetails",
      );

      cy.window().then((win) => {
        win.localStorage.setItem("authToken", "test-token");
        win.localStorage.setItem(
          "userData",
          JSON.stringify({ email: "test@example.com" }),
        );
        win.localStorage.setItem(
          "users",
          JSON.stringify([{ email: "test@example.com", favorites: [] }]),
        );
      });

      cy.wait("@getRecipeDetails");

      cy.contains("Test Recipe").should("be.visible");

      cy.contains("Add to Favorites").click();

      cy.window().then((win) => {
        const users = JSON.parse(win.localStorage.getItem("users") || "[]");
        const currentUser = users.find(
          (user) => user.email === "test@example.com",
        );
        expect(currentUser.favorites).to.have.length(1);
        expect(currentUser.favorites[0]).to.deep.equal({
          title: "Test Recipe",
          extendedIngredients: ["Ingredient 1", "Ingredient 2"],
          summary: "<p>Test summary</p>",
          instructions: "<p>Test instructions</p>",
          image: "http://example.com/image.jpg",
        });
      });

      cy.on("window:alert", (str) => {
        expect(str).to.equal("Recipe added to favorites!");
      });
    });
  });
});
