import React, { useState, useContext } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import config from "../../config/config"; // Assuming you have your config file
import { ThemeContext } from "../../context/theme";
import { useTranslation } from "react-i18next";

interface RecipeDetails {
  title: string;
  extendedIngredients: string[];
  summary: string;
  instructions: string[];
}

const AIGeneratedRecipe: React.FC = () => {
  const { theme } = useContext(ThemeContext); // Accessing theme from context
  const { t } = useTranslation(); // Initialize the useTranslation hook

  const [inputValue, setInputValue] = useState<string>("");
  const [recipeDetails, setRecipeDetails] = useState<RecipeDetails | null>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("ingredients");
  const [error, setError] = useState<string | null>(null); // Added state for error handling

  const apiKey = config.geminiApiKey; // Get your API key from the config file
  const genAI = new GoogleGenerativeAI(apiKey);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const parseTextToRecipe = (text: string): RecipeDetails => {
    const lines = text.split("\n");
    const ingredients: string[] = [];
    const instructions: string[] = [];
    let isInstructions = false;
    let foundIngredients = false;
    let foundInstructions = false;

    lines.forEach((line) => {
      const trimmedLine = line.trim();
      if (
        trimmedLine.toLowerCase().startsWith("ingredients:") ||
        trimmedLine.toLowerCase().includes("ingredients")
      ) {
        isInstructions = false;
        foundIngredients = true;
      } else if (
        trimmedLine.toLowerCase().startsWith("instructions:") ||
        trimmedLine.toLowerCase().includes("instructions")
      ) {
        isInstructions = true;
        foundInstructions = true;
      } else if (isInstructions) {
        if (trimmedLine !== "") {
          instructions.push(`- ${trimmedLine}`);
        }
      } else if (foundIngredients) {
        if (
          trimmedLine !== "" &&
          !trimmedLine.toLowerCase().startsWith("instructions")
        ) {
          ingredients.push(`- ${trimmedLine}`);
        }
      }
    });

    // If no ingredients are found, add a placeholder indicating that no ingredients were found
    if (ingredients.length === 0 && foundIngredients) {
      ingredients.push(t("No ingredients found."));
    }

    // If no instructions are found, add a placeholder indicating that no instructions were found
    if (instructions.length === 0 && foundInstructions) {
      instructions.push(t("No instructions found."));
    }

    return {
      title: inputValue || t("Recipe Title"), // Use inputValue as the title
      extendedIngredients: ingredients,
      summary: "", // Assuming summary is not provided
      instructions,
    };
  };

  const validateRecipeContent = (text: string): boolean => {
    // Check if the text contains common recipe-related keywords
    const keywords = ["ingredients", "instructions", "cook", "recipe", "serve"];
    return keywords.some((keyword) => text.toLowerCase().includes(keyword));
  };

  const getResponseForGivenPrompt = async () => {
    try {
      setLoading(true);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = `${t("Generate a recipe with the following information:")}\n\n${t("Title")}: ${inputValue}\n${t("Ingredients")}\n- ${t("List each ingredient separately.")}\n${t("Instructions")}\n- ${t("Provide step-by-step instructions in a clear and concise format.")}`;
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = await response.text();

      if (validateRecipeContent(text)) {
        // Parse the text response
        const generatedRecipeDetails = parseTextToRecipe(text);
        setRecipeDetails(generatedRecipeDetails);
        setError(null); // Clear any previous errors
      } else {
        setError(
          t("The generated content does not appear to be a valid food recipe."),
        ); // Set error message
        // Do not clear previous recipe details
      }
      setInputValue("");
      setLoading(false);
    } catch (error) {
      console.log("Something Went Wrong", error);
      setError(t("An error occurred while generating the recipe.")); // Set error message
      // Do not clear previous recipe details
      setLoading(false);
    }
  };

  return (
    <div className={`container mx-auto p-4`}>
      <div className="flex mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={t("Enter a recipe name or ask for a recipe")}
          className={`flex-1 px-4 py-2 border rounded-md`}
        />
        <button
          onClick={getResponseForGivenPrompt}
          className={`ml-4 px-4 py-2 rounded-md ${theme === "dark" ? "bg-blue-600 text-white" : "bg-blue-500 text-white"}`}
        >
          {t("Generate")}
        </button>
      </div>

      {loading ? (
        <div className="text-center mt-3">
          <div
            className={`animate-spin border-t-4 ${theme === "dark" ? "border-blue-400" : "border-blue-500"} border-solid rounded-full w-12 h-12 mx-auto`}
          ></div>
        </div>
      ) : error ? (
        <div className="text-center mt-3">
          <p
            className={`${theme === "dark" ? "text-red-400" : "text-red-500"}`}
          >
            {error}
          </p>
        </div>
      ) : (
        recipeDetails && (
          <div className="flex flex-col md:flex-row">
            <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
              <h2
                className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 ${theme === "dark" ? "text-white" : "text-black"}`}
              >
                {recipeDetails.title}
              </h2>
            </div>
            <div className="ml-0 md:ml-20 mt-8 md:mt-0 flex-1">
              <div className="flex mb-4">
                <button
                  className={`px-4 py-2 border-2 border-black font-semibold ${
                    activeTab === "ingredients"
                      ? `${theme === "dark" ? "bg-gray-600 text-white" : "bg-gray-800 text-white"}`
                      : `${theme === "dark" ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-black"}`
                  } mr-4 rounded-md`}
                  onClick={() => setActiveTab("ingredients")}
                >
                  {t("Ingredients")}
                </button>
                <button
                  className={`px-4 py-2 border-2 border-black font-semibold ${
                    activeTab === "instructions"
                      ? `${theme === "dark" ? "bg-gray-600 text-white" : "bg-gray-800 text-white"}`
                      : `${theme === "dark" ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-black"}`
                  } rounded-md`}
                  onClick={() => setActiveTab("instructions")}
                >
                  {t("Instructions")}
                </button>
              </div>
              {activeTab === "ingredients" && (
                <ul className="mt-4 list-disc list-inside">
                  {recipeDetails.extendedIngredients.map(
                    (ingredient, index) => (
                      <li
                        key={index}
                        className={`text-base sm:text-lg leading-6 ${theme === "dark" ? "text-gray-300" : "text-black"}`}
                      >
                        {ingredient}
                      </li>
                    ),
                  )}
                </ul>
              )}
              {activeTab === "instructions" && (
                <ul className="mt-4 list-inside pl-4">
                  {recipeDetails.instructions.map((instruction, index) => (
                    <li
                      key={index}
                      className={`text-base sm:text-lg leading-6 ${theme === "dark" ? "text-gray-300" : "text-black"}`}
                    >
                      {instruction}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default AIGeneratedRecipe;
