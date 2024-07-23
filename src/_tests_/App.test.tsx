/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import SignupForm from "../pages/signup/SignupForm";
import SigninForm from "../pages/signin/SigninForm";
import { fetchRecipeDetails } from "../context/Recipes/action";
import Recipe from "../pages/Recipe/Recipe";
import userEvent from '@testing-library/user-event';

jest.mock("../context/Recipes/action", () => ({
  fetchRecipeDetails: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("SignupForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear(); // Clear localStorage before each test
  });


  test('successful signup', async () => {
    const { getByLabelText, getByText } = render(
      <Router>
        <SignupForm />
      </Router>
    );

    fireEvent.change(getByLabelText(/Your Name:/i), { target: { value: 'John Doe' } });
    fireEvent.change(getByLabelText(/Email:/i), { target: { value: 'john@example.com' } });
    fireEvent.change(getByLabelText(/Password:/i), { target: { value: 'password123' } });

    fireEvent.click(getByText(/Register/i));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/');
      expect(localStorage.getItem('authToken')).toBeTruthy();
      expect(localStorage.getItem('userData')).toBeTruthy();
    });
  });

  test('signup with existing email', async () => {
    localStorage.setItem('users', JSON.stringify([{ email: 'john@example.com' }]));

    const { getByLabelText, getByText } = render(
      <Router>
        <SignupForm />
      </Router>
    );

    fireEvent.change(getByLabelText(/Your Name:/i), { target: { value: 'John Doe' } });
    fireEvent.change(getByLabelText(/Email:/i), { target: { value: 'john@example.com' } });
    fireEvent.change(getByLabelText(/Password:/i), { target: { value: 'password123' } });

    fireEvent.click(getByText(/Register/i));

    await waitFor(() => {
      expect(getByText(/User with this email already exists/i)).toBeInTheDocument();
    });
  });
});
describe("SigninForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear(); // Clear localStorage before each test
  });

  test("redirects to home page on successful sign-in", async () => {
    // Set up the local storage with a user
    localStorage.setItem(
      "users",
      JSON.stringify([{ email: "johndoe@example.com", password: "password123" }])
    );

    render(
      <Router>
        <SigninForm />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/Email:/i), { target: { value: "johndoe@example.com" } });
    fireEvent.change(screen.getByLabelText(/Password:/i), { target: { value: "password123" } });

    fireEvent.click(screen.getByText(/Sign In/i));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });

  test('shows error message if credentials are invalid', async () => {
    render(
      <Router>
        <SigninForm />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/Email:/i), { target: { value: "nonexistent@example.com" } });
    fireEvent.change(screen.getByLabelText(/Password:/i), { target: { value: "wrongpassword" } });

    fireEvent.click(screen.getByText(/Sign In/i));

    await waitFor(() => {
      expect(screen.getByText(/Invalid email or password/i)).toBeInTheDocument();
    });
  });
});


describe('Favorites', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('adds recipe to favorites when user is authenticated', async () => {
    const mockRecipeDetails = {
      id: '123',
      title: 'Test Recipe',
      image: 'http://example.com/image.jpg',
      summary: '<p>Test summary</p>',
      instructions: '<p>Test instructions</p>',
      extendedIngredients: [
        { id: 1, original: 'Ingredient 1' },
        { id: 2, original: 'Ingredient 2' },
      ],
    };

    // Set up the mock return value
    (fetchRecipeDetails as jest.Mock).mockResolvedValue(mockRecipeDetails);

    localStorage.setItem('authToken', 'test-token');
    localStorage.setItem('userData', JSON.stringify({ email: 'test@example.com' }));
    localStorage.setItem('users', JSON.stringify([{ email: 'test@example.com', favorites: [] }]));

    render(
      <Router>
        <Recipe />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText('Test Recipe')).toBeInTheDocument();
    });

    const addToFavoritesButton = screen.getByText('Add to Favorites');
    await userEvent.click(addToFavoritesButton);

    await waitFor(() => {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const currentUser = users.find((user: any) => user.email === 'test@example.com');
      expect(currentUser.favorites).toHaveLength(1);
      expect(currentUser.favorites[0]).toEqual({
        title: 'Test Recipe',
        extendedIngredients: ['Ingredient 1', 'Ingredient 2'],
        summary: '<p>Test summary</p>',
        instructions: '<p>Test instructions</p>',
        image: 'http://example.com/image.jpg',
      });
    });

    expect(window.alert).toHaveBeenCalledWith('Recipe added to favorites!');
  });
});