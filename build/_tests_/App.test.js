var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import SignupForm from "../pages/signup/SignupForm";
import SigninForm from "../pages/signin/SigninForm";
import { fetchRecipeDetails } from "../context/Recipes/action";
import Recipe from "../pages/Recipe/Recipe";
import userEvent from "@testing-library/user-event";
jest.mock("../context/Recipes/action", () => ({
  fetchRecipeDetails: jest.fn(),
}));
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () =>
  Object.assign(Object.assign({}, jest.requireActual("react-router-dom")), {
    useNavigate: () => mockNavigate,
  }),
);
describe("SignupForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear(); // Clear localStorage before each test
  });
  test("successful signup", () =>
    __awaiter(void 0, void 0, void 0, function* () {
      const { getByLabelText, getByText } = render(
        _jsx(Router, { children: _jsx(SignupForm, {}) }),
      );
      fireEvent.change(getByLabelText(/Your Name:/i), {
        target: { value: "John Doe" },
      });
      fireEvent.change(getByLabelText(/Email:/i), {
        target: { value: "john@example.com" },
      });
      fireEvent.change(getByLabelText(/Password:/i), {
        target: { value: "password123" },
      });
      fireEvent.click(getByText(/Register/i));
      yield waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith("/");
        expect(localStorage.getItem("authToken")).toBeTruthy();
        expect(localStorage.getItem("userData")).toBeTruthy();
      });
    }));
  test("signup with existing email", () =>
    __awaiter(void 0, void 0, void 0, function* () {
      localStorage.setItem(
        "users",
        JSON.stringify([{ email: "john@example.com" }]),
      );
      const { getByLabelText, getByText } = render(
        _jsx(Router, { children: _jsx(SignupForm, {}) }),
      );
      fireEvent.change(getByLabelText(/Your Name:/i), {
        target: { value: "John Doe" },
      });
      fireEvent.change(getByLabelText(/Email:/i), {
        target: { value: "john@example.com" },
      });
      fireEvent.change(getByLabelText(/Password:/i), {
        target: { value: "password123" },
      });
      fireEvent.click(getByText(/Register/i));
      yield waitFor(() => {
        expect(
          getByText(/User with this email already exists/i),
        ).toBeInTheDocument();
      });
    }));
});
describe("SigninForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear(); // Clear localStorage before each test
  });
  test("redirects to home page on successful sign-in", () =>
    __awaiter(void 0, void 0, void 0, function* () {
      // Set up the local storage with a user
      localStorage.setItem(
        "users",
        JSON.stringify([
          { email: "johndoe@example.com", password: "password123" },
        ]),
      );
      render(_jsx(Router, { children: _jsx(SigninForm, {}) }));
      fireEvent.change(screen.getByLabelText(/Email:/i), {
        target: { value: "johndoe@example.com" },
      });
      fireEvent.change(screen.getByLabelText(/Password:/i), {
        target: { value: "password123" },
      });
      fireEvent.click(screen.getByText(/Sign In/i));
      yield waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith("/");
      });
    }));
  test("shows error message if credentials are invalid", () =>
    __awaiter(void 0, void 0, void 0, function* () {
      render(_jsx(Router, { children: _jsx(SigninForm, {}) }));
      fireEvent.change(screen.getByLabelText(/Email:/i), {
        target: { value: "nonexistent@example.com" },
      });
      fireEvent.change(screen.getByLabelText(/Password:/i), {
        target: { value: "wrongpassword" },
      });
      fireEvent.click(screen.getByText(/Sign In/i));
      yield waitFor(() => {
        expect(
          screen.getByText(/Invalid email or password/i),
        ).toBeInTheDocument();
      });
    }));
});
describe("Favorites", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.spyOn(window, "alert").mockImplementation(() => {});
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test("adds recipe to favorites when user is authenticated", () =>
    __awaiter(void 0, void 0, void 0, function* () {
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
      // Set up the mock return value
      fetchRecipeDetails.mockResolvedValue(mockRecipeDetails);
      localStorage.setItem("authToken", "test-token");
      localStorage.setItem(
        "userData",
        JSON.stringify({ email: "test@example.com" }),
      );
      localStorage.setItem(
        "users",
        JSON.stringify([{ email: "test@example.com", favorites: [] }]),
      );
      render(_jsx(Router, { children: _jsx(Recipe, {}) }));
      yield waitFor(() => {
        expect(screen.getByText("Test Recipe")).toBeInTheDocument();
      });
      const addToFavoritesButton = screen.getByText("Add to Favorites");
      yield userEvent.click(addToFavoritesButton);
      yield waitFor(() => {
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const currentUser = users.find(
          (user) => user.email === "test@example.com",
        );
        expect(currentUser.favorites).toHaveLength(1);
        expect(currentUser.favorites[0]).toEqual({
          title: "Test Recipe",
          extendedIngredients: ["Ingredient 1", "Ingredient 2"],
          summary: "<p>Test summary</p>",
          instructions: "<p>Test instructions</p>",
          image: "http://example.com/image.jpg",
        });
      });
      expect(window.alert).toHaveBeenCalledWith("Recipe added to favorites!");
    }));
});
