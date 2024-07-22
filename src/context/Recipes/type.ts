export interface RecipeState {
  recipes: Recipe[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

export interface Recipe {
  id: string;
  title: string;
  image: string;
}

export interface RecipeResponse {
  recipes: Recipe[];
}

export enum RecipeAvailableAction {
  FETCH_RECIPE_REQUEST = "FETCH_RECIPE_REQUEST",
  FETCH_RECIPE_SUCCESS = "FETCH_RECIPE_SUCCESS",
  FETCH_RECIPE_FAILURE = "FETCH_RECIPE_FAILURE",
}

export type RecipeActions =
  | { type: RecipeAvailableAction.FETCH_RECIPE_REQUEST }
  | { type: RecipeAvailableAction.FETCH_RECIPE_SUCCESS; payload: Recipe[] }
  | { type: RecipeAvailableAction.FETCH_RECIPE_FAILURE; payload: string };

// A type to hold dispatch actions in a context.
export type RecipeDispatch = React.Dispatch<RecipeActions>;
