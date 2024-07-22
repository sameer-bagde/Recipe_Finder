/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useReducer } from "react";
import { recipeReducer, initialState } from "./reducer";
import { RecipeDispatch, RecipeState } from "./type";

const RecipeStateContext = createContext<RecipeState>(initialState);
const RecipeDispatchContext = createContext<RecipeDispatch>(() => {});

export const RecipeProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(recipeReducer, initialState);
  return (
    <RecipeStateContext.Provider value={state}>
      <RecipeDispatchContext.Provider value={dispatch}>
        {children}
      </RecipeDispatchContext.Provider>
    </RecipeStateContext.Provider>
  );
};

// Create helper hooks to extract the `state` and `dispatch` out of the context.
export const useRecipeState = () => useContext(RecipeStateContext);
export const useRecipeDispatch = () => useContext(RecipeDispatchContext);
