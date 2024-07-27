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
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, useContext, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { fetchRecipesBySearch } from "../../context/Recipes/action";
import { Dialog, Transition } from "@headlessui/react";
import { ThemeContext } from "../../context/theme";
const SearchRecipe = () => {
  const { query } = useParams();
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [isOpen, setOpen] = useState(false);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = () =>
      __awaiter(void 0, void 0, void 0, function* () {
        if (query) {
          try {
            const fetchedResults = yield fetchRecipesBySearch(query);
            setResults(fetchedResults);
            setOpen(true);
          } catch (error) {
            setError("");
          }
        }
      });
    fetchData();
  }, [query]);
  const closeModal = () => {
    setOpen(false);
    navigate("../..");
  };
  if (error) return _jsx("p", { className: "text-red-500", children: error });
  return _jsx(Transition, {
    appear: true,
    show: isOpen,
    as: Fragment,
    children: _jsx(Dialog, {
      as: "div",
      className:
        "fixed inset-0 z-50 overflow-y-auto flex justify-center bg-black bg-opacity-25",
      onClose: closeModal,
      children: _jsx("div", {
        className: "flex items-center justify-center max-h-2xl",
        children: _jsx(Transition.Child, {
          as: Fragment,
          enter: "ease-out duration-300",
          enterFrom: "opacity-0 scale-95",
          enterTo: "opacity-100 scale-100",
          leave: "ease-in duration-200",
          leaveFrom: "opacity-100 scale-100",
          leaveTo: "opacity-0 scale-95",
          children: _jsx(Dialog.Panel, {
            className: `mx-auto m-auto p-10 w-full max-w-3xl transform overflow-hidden rounded-2xl align-middle shadow-xl transition-all ${theme === "dark" ? "bg-gray-800" : "bg-white"}`,
            children: _jsxs("div", {
              className: "container mx-auto",
              children: [
                _jsx("div", {
                  className:
                    "text-indigo-600 flex items-center pb-2 pr-2 border-b-2 border-indigo-600 uppercase",
                  children: _jsx("p", {
                    className: "font-semibold inline-block",
                    children: "Search Result",
                  }),
                }),
                _jsx("div", {
                  className:
                    "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4",
                  children:
                    results.length > 0
                      ? results.map((recipe) =>
                          _jsxs(
                            "div",
                            {
                              className: "relative bg-gray-200 rounded-lg p-4",
                              children: [
                                _jsx("img", {
                                  src: recipe.image,
                                  alt: recipe.title,
                                  className:
                                    "w-full h-40 object-cover rounded-lg mb-2",
                                }),
                                _jsx("p", {
                                  className:
                                    "text-base font-medium text-gray-800",
                                  children: recipe.title,
                                }),
                                _jsx(Link, {
                                  to: `/recipe/${recipe.id}`,
                                  className: "no-underline",
                                  children: _jsx("div", {
                                    className: `px-6 py-3 flex flex-col items-center rounded-xl justify-center ${
                                      theme === "dark"
                                        ? "bg-gray-700 text-gray-300 hover:bg-gray-800"
                                        : "bg-slate-700 text-slate-200 hover:bg-slate-600"
                                    }`,
                                    children: _jsx("p", {
                                      className: "font-mono",
                                      children: "Recipe",
                                    }),
                                  }),
                                }),
                              ],
                            },
                            recipe.id,
                          ),
                        )
                      : _jsx("p", { children: "No recipes found" }),
                }),
                _jsx("div", {
                  className: "story-read-more-wrapper pt-2",
                  children: _jsx("div", {
                    className: "flex justify-center",
                    children: _jsx("button", {
                      onClick: closeModal,
                      className: `px-4 py-2 ${
                        theme === "dark"
                          ? "bg-blue-400"
                          : "bg-gray-200 hover:bg-gray-400"
                      } rounded-md`,
                      children: "Close",
                    }),
                  }),
                }),
              ],
            }),
          }),
        }),
      }),
    }),
  });
};
export default SearchRecipe;
