import { RecipeAvailableAction } from "./type";
export const initialState = {
  recipes: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
};
export const recipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case RecipeAvailableAction.FETCH_RECIPE_REQUEST:
      return Object.assign(Object.assign({}, state), {
        isLoading: true,
        isError: false,
        errorMessage: "",
      });
    case RecipeAvailableAction.FETCH_RECIPE_SUCCESS:
      return Object.assign(Object.assign({}, state), {
        isLoading: false,
        recipes: action.payload,
      });
    case RecipeAvailableAction.FETCH_RECIPE_FAILURE:
      return Object.assign(Object.assign({}, state), {
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      });
    default:
      return state;
  }
};
