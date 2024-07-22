/* eslint-disable @typescript-eslint/no-explicit-any */
import config from "../../config/config";
import { RecipeAvailableAction } from "./type";

const API_ENDPOINT = "https://api.spoonacular.com";

export const fetchRandomRecipes = async (dispatch: any) => {
  const apiKey = config.apiKey;

  try {
    dispatch({ type: RecipeAvailableAction.FETCH_RECIPE_REQUEST });

    const response = await fetch(
      `${API_ENDPOINT}/recipes/random?apiKey=${apiKey}&number=3000`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    dispatch({
      type: RecipeAvailableAction.FETCH_RECIPE_SUCCESS,
      payload: data.recipes,
    });
  } catch (error) {
    console.log("Error fetching recipes:", error);
    dispatch({
      type: RecipeAvailableAction.FETCH_RECIPE_FAILURE,
      payload: "Unable to load recipes",
    });
  }
};

export const fetchRecipesBySearch = async (searchTerm: string) => {
  const apiKey = config.apiKey;

  try {
    const response = await fetch(
      `${API_ENDPOINT}/recipes/complexSearch?apiKey=${apiKey}&query=${searchTerm}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log("Error fetching recipes by search:", error);
    throw new Error("");
  }
};

export const fetchRecipeDetails = async (id: string) => {
  const apiKey = config.apiKey;

  try {
    const response = await fetch(
      `${API_ENDPOINT}/recipes/${id}/information?apiKey=${apiKey}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error fetching recipe details:", error);
    throw new Error("Unable to load recipe details");
  }
};
