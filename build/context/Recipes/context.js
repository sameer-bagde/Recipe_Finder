import { jsx as _jsx } from "react/jsx-runtime";
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer } from "react";
import { recipeReducer, initialState } from "./reducer";
const RecipeStateContext = createContext(initialState);
const RecipeDispatchContext = createContext(() => {});
export const RecipeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(recipeReducer, initialState);
  return _jsx(RecipeStateContext.Provider, {
    value: state,
    children: _jsx(RecipeDispatchContext.Provider, {
      value: dispatch,
      children: children,
    }),
  });
};
// Create helper hooks to extract the `state` and `dispatch` out of the context.
export const useRecipeState = () => useContext(RecipeStateContext);
export const useRecipeDispatch = () => useContext(RecipeDispatchContext);
