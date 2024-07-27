import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../header";
import RandomRecipes from "./RandomRecipe/RandomRecipe";
import Search from "./Search";
import AIGeneratedRecipe from "./AI/AIGeneratedRecipe";
import { ThemeContext } from "../context/theme";
import { useTranslation } from "react-i18next";
const Home = () => {
  const { t } = useTranslation();
  const [showAIGeneratedRecipe, setShowAIGeneratedRecipe] = useState(false);
  const { theme } = useContext(ThemeContext);
  const authenticated = !!localStorage.getItem("authToken");
  const handleToggle = () => {
    setShowAIGeneratedRecipe(!showAIGeneratedRecipe);
  };
  return _jsxs("div", {
    className: `w-full ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`,
    children: [
      _jsx(Header, {}),
      authenticated &&
        _jsxs("div", {
          className: "pt-4 flex justify-center items-center gap-4",
          children: [
            _jsx("button", {
              className: `bg-blue-500 text-white px-4 py-2 rounded ${theme === "dark" ? "hover:bg-blue-600" : "hover:bg-blue-700"}`,
              onClick: handleToggle,
              children: showAIGeneratedRecipe
                ? t("Show Search")
                : t("Show AI Generated Recipe"),
            }),
            _jsx(Link, {
              to: `/user/favorites`,
              className: "no-underline",
              children: _jsx("div", {
                className: `px-6 py-3 flex flex-col items-center rounded-xl justify-center`,
                children: _jsx("p", {
                  className: `bg-blue-500 text-white px-4 py-2 rounded ${theme === "dark" ? "hover:bg-blue-600" : "hover:bg-blue-700"}`,
                  children: t("Favorites"),
                }),
              }),
            }),
          ],
        }),
      _jsx("div", {
        className: "w-full",
        children: showAIGeneratedRecipe
          ? _jsx(AIGeneratedRecipe, {})
          : _jsx(Search, {}),
      }),
      _jsx("div", { className: "w-full", children: _jsx(RandomRecipes, {}) }),
    ],
  });
};
export default Home;
