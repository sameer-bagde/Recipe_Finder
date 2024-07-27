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
/* eslint-disable @typescript-eslint/no-explicit-any */
import config from "../../config/config";
import { RecipeAvailableAction } from "./type";
const API_ENDPOINT = "https://api.spoonacular.com";
export const fetchRandomRecipes = (dispatch) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const apiKey = config.apiKey;
    try {
      dispatch({ type: RecipeAvailableAction.FETCH_RECIPE_REQUEST });
      const response = yield fetch(
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
      const data = yield response.json();
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
  });
export const fetchRecipesBySearch = (searchTerm) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const apiKey = config.apiKey;
    try {
      const response = yield fetch(
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
      const data = yield response.json();
      return data.results;
    } catch (error) {
      console.log("Error fetching recipes by search:", error);
      throw new Error("");
    }
  });
export const fetchRecipeDetails = (id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const apiKey = config.apiKey;
    try {
      const response = yield fetch(
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
      const data = yield response.json();
      return data;
    } catch (error) {
      console.log("Error fetching recipe details:", error);
      throw new Error("Unable to load recipe details");
    }
  });
