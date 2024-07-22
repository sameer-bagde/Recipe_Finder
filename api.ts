// src/api.ts
import axios from "axios";

interface Recipe {
  id: number;
  title: string;
  image: string;
}

interface RecipeResponse {
  results: Recipe[];
}

const spoonacularApi = axios.create({
  baseURL: "https://api.spoonacular.com/",
  params: {
    // apiKey: config.apiKey,
  },
});

export const getRecipes = async (
  query: string,
  cuisine?: string,
): Promise<Recipe[]> => {
  try {
    const response = await spoonacularApi.get<RecipeResponse>(
      "recipes/complexSearch",
      {
        params: {
          query,
          cuisine,
        },
      },
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }
};
