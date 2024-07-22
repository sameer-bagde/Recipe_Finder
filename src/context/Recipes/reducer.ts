import { Reducer } from "react";
import { RecipeActions, RecipeAvailableAction, RecipeState } from "./type";
export const initialState: RecipeState = {
  recipes: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
};

export const recipeReducer: Reducer<RecipeState, RecipeActions> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case RecipeAvailableAction.FETCH_RECIPE_REQUEST:
      return { ...state, isLoading: true, isError: false, errorMessage: "" };
    case RecipeAvailableAction.FETCH_RECIPE_SUCCESS:
      return { ...state, isLoading: false, recipes: action.payload };
    case RecipeAvailableAction.FETCH_RECIPE_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};
