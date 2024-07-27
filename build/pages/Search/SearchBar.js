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
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/theme";
import { fetchRecipesBySearch } from "../../context/Recipes/action";
import { useTranslation } from "react-i18next";
const SearchBar = () => {
  const { theme } = useContext(ThemeContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation(); // Initialize the useTranslation hook
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleSearch = () =>
    __awaiter(void 0, void 0, void 0, function* () {
      try {
        if (searchTerm.trim() === "") return; // Do nothing if searchTerm is empty
        const results = yield fetchRecipesBySearch(searchTerm);
        navigate(`/search/${searchTerm}`, { state: { results } });
      } catch (error) {
        console.log("Error searching recipes:", error);
        setErrorMessage(t("Unable to Load Recipes")); // Translate error message
      }
    });
  return _jsxs("div", {
    className: `flex justify-center items-center px-20 pt-10 space-x-4 ${theme === "dark" ? "bg-black" : "bg-white"}`,
    children: [
      _jsxs("div", {
        className: "flex bg-gray-100 p-4 w-72 space-x-1 rounded-lg",
        children: [
          _jsx("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            className: `h-6 w-6 opacity-60 ${theme === "dark" ? "text-gray-300" : "text-gray-500"}`,
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "currentColor",
            children: _jsx("path", {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: 2,
              d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
            }),
          }),
          _jsx("input", {
            className: `bg-gray-100 outline-none placeholder-gray-500 text-gray-800`,
            type: "text",
            placeholder: t("Recipe or Ingredients..."),
            value: searchTerm,
            onChange: handleInputChange,
          }),
        ],
      }),
      _jsxs(Link, {
        to: `/search/${encodeURIComponent(searchTerm.trim())}`,
        className: `py-3 px-5 text-white font-semibold rounded-lg hover:shadow-lg transition duration-300 cursor-pointer ${theme === "dark" ? "bg-blue-600 text-white" : "bg-blue-500 text-white"}`,
        onClick: (e) => {
          if (searchTerm.trim() === "") {
            e.preventDefault();
          } else {
            handleSearch();
          }
        },
        children: [_jsx("span", { children: t("Search") }), " "],
      }),
      errorMessage &&
        _jsx("p", { className: "text-red-500 mt-2", children: errorMessage }),
    ],
  });
};
export default SearchBar;
