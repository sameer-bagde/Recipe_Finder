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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useContext } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import config from "../../config/config"; // Assuming you have your config file
import { ThemeContext } from "../../context/theme";
import { useTranslation } from "react-i18next";
const AIGeneratedRecipe = () => {
  const { theme } = useContext(ThemeContext); // Accessing theme from context
  const { t } = useTranslation(); // Initialize the useTranslation hook
  const [inputValue, setInputValue] = useState("");
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("ingredients");
  const [error, setError] = useState(null); // Added state for error handling
  const apiKey = config.geminiApiKey; // Get your API key from the config file
  const genAI = new GoogleGenerativeAI(apiKey);
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const parseTextToRecipe = (text) => {
    const lines = text.split("\n");
    const ingredients = [];
    const instructions = [];
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
  const validateRecipeContent = (text) => {
    // Check if the text contains common recipe-related keywords
    const keywords = ["ingredients", "instructions", "cook", "recipe", "serve"];
    return keywords.some((keyword) => text.toLowerCase().includes(keyword));
  };
  const getResponseForGivenPrompt = () =>
    __awaiter(void 0, void 0, void 0, function* () {
      try {
        setLoading(true);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = `${t("Generate a recipe with the following information:")}\n\n${t("Title")}: ${inputValue}\n${t("Ingredients")}\n- ${t("List each ingredient separately.")}\n${t("Instructions")}\n- ${t("Provide step-by-step instructions in a clear and concise format.")}`;
        const result = yield model.generateContent(prompt);
        const response = result.response;
        const text = yield response.text();
        if (validateRecipeContent(text)) {
          // Parse the text response
          const generatedRecipeDetails = parseTextToRecipe(text);
          setRecipeDetails(generatedRecipeDetails);
          setError(null); // Clear any previous errors
        } else {
          setError(
            t(
              "The generated content does not appear to be a valid food recipe.",
            ),
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
    });
  return _jsxs("div", {
    className: `container mx-auto p-4`,
    children: [
      _jsxs("div", {
        className: "flex mb-4",
        children: [
          _jsx("input", {
            type: "text",
            value: inputValue,
            onChange: handleInputChange,
            placeholder: t("Enter a recipe name or ask for a recipe"),
            className: `flex-1 px-4 py-2 border rounded-md`,
          }),
          _jsx("button", {
            onClick: getResponseForGivenPrompt,
            className: `ml-4 px-4 py-2 rounded-md ${theme === "dark" ? "bg-blue-600 text-white" : "bg-blue-500 text-white"}`,
            children: t("Generate"),
          }),
        ],
      }),
      loading
        ? _jsx("div", {
            className: "text-center mt-3",
            children: _jsx("div", {
              className: `animate-spin border-t-4 ${theme === "dark" ? "border-blue-400" : "border-blue-500"} border-solid rounded-full w-12 h-12 mx-auto`,
            }),
          })
        : error
          ? _jsx("div", {
              className: "text-center mt-3",
              children: _jsx("p", {
                className: `${theme === "dark" ? "text-red-400" : "text-red-500"}`,
                children: error,
              }),
            })
          : recipeDetails &&
            _jsxs("div", {
              className: "flex flex-col md:flex-row",
              children: [
                _jsx("div", {
                  className:
                    "flex flex-col items-center md:items-start mb-4 md:mb-0",
                  children: _jsx("h2", {
                    className: `text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 ${theme === "dark" ? "text-white" : "text-black"}`,
                    children: recipeDetails.title,
                  }),
                }),
                _jsxs("div", {
                  className: "ml-0 md:ml-20 mt-8 md:mt-0 flex-1",
                  children: [
                    _jsxs("div", {
                      className: "flex mb-4",
                      children: [
                        _jsx("button", {
                          className: `px-4 py-2 border-2 border-black font-semibold ${
                            activeTab === "ingredients"
                              ? `${theme === "dark" ? "bg-gray-600 text-white" : "bg-gray-800 text-white"}`
                              : `${theme === "dark" ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-black"}`
                          } mr-4 rounded-md`,
                          onClick: () => setActiveTab("ingredients"),
                          children: t("Ingredients"),
                        }),
                        _jsx("button", {
                          className: `px-4 py-2 border-2 border-black font-semibold ${
                            activeTab === "instructions"
                              ? `${theme === "dark" ? "bg-gray-600 text-white" : "bg-gray-800 text-white"}`
                              : `${theme === "dark" ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-black"}`
                          } rounded-md`,
                          onClick: () => setActiveTab("instructions"),
                          children: t("Instructions"),
                        }),
                      ],
                    }),
                    activeTab === "ingredients" &&
                      _jsx("ul", {
                        className: "mt-4 list-disc list-inside",
                        children: recipeDetails.extendedIngredients.map(
                          (ingredient, index) =>
                            _jsx(
                              "li",
                              {
                                className: `text-base sm:text-lg leading-6 ${theme === "dark" ? "text-gray-300" : "text-black"}`,
                                children: ingredient,
                              },
                              index,
                            ),
                        ),
                      }),
                    activeTab === "instructions" &&
                      _jsx("ul", {
                        className: "mt-4 list-inside pl-4",
                        children: recipeDetails.instructions.map(
                          (instruction, index) =>
                            _jsx(
                              "li",
                              {
                                className: `text-base sm:text-lg leading-6 ${theme === "dark" ? "text-gray-300" : "text-black"}`,
                                children: instruction,
                              },
                              index,
                            ),
                        ),
                      }),
                  ],
                }),
              ],
            }),
    ],
  });
};
export default AIGeneratedRecipe;
