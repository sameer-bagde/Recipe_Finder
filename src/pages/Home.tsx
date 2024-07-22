import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../header";
import RandomRecipes from "./RandomRecipe/RandomRecipe";
import Search from "./Search";
import AIGeneratedRecipe from "./AI/AIGeneratedRecipe";
import { ThemeContext } from "../context/theme";
import { useTranslation } from "react-i18next";

const Home: React.FC = () => {
  const { t } = useTranslation();
  const [showAIGeneratedRecipe, setShowAIGeneratedRecipe] =
    useState<boolean>(false);
  const { theme } = useContext(ThemeContext);
  const authenticated = !!localStorage.getItem("authToken");

  const handleToggle = () => {
    setShowAIGeneratedRecipe(!showAIGeneratedRecipe);
  };

  return (
    <div
      className={`w-full ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}
    >
      <Header />
      {authenticated && (
        <div className="pt-4 flex justify-center items-center gap-4">
          <button
            className={`bg-blue-500 text-white px-4 py-2 rounded ${theme === "dark" ? "hover:bg-blue-600" : "hover:bg-blue-700"}`}
            onClick={handleToggle}
          >
            {showAIGeneratedRecipe
              ? t("Show Search")
              : t("Show AI Generated Recipe")}
          </button>
          <Link to={`/user/favorites`} className="no-underline">
            <div
              className={`px-6 py-3 flex flex-col items-center rounded-xl justify-center`}
            >
              <p
                className={`bg-blue-500 text-white px-4 py-2 rounded ${theme === "dark" ? "hover:bg-blue-600" : "hover:bg-blue-700"}`}
              >
                {t("Favorites")}
              </p>
            </div>
          </Link>
        </div>
      )}
      <div className="w-full">
        {showAIGeneratedRecipe ? <AIGeneratedRecipe /> : <Search />}
      </div>
      <div className="w-full">
        <RandomRecipes />
      </div>
    </div>
  );
};

export default Home;
