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
import { useNavigate, useParams } from "react-router-dom";
import { fetchRecipeDetails } from "../../context/Recipes/action";
import { ThemeContext } from "../../context/theme";
import { Dialog, Transition } from "@headlessui/react";
import * as Sentry from "@sentry/react";
const Recipe = () => {
  var _a;
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("instructions");
  const [isOpen, setOpen] = useState(false);
  const { theme } = useContext(ThemeContext); // Accessing theme from context
  const navigate = useNavigate();
  const { id } = useParams();
  const authenticated = !!localStorage.getItem("authToken");
  useEffect(() => {
    let isMounted = true;
    const fetchDetails = () =>
      __awaiter(void 0, void 0, void 0, function* () {
        try {
          const data = yield fetchRecipeDetails(id);
          if (isMounted) setDetails(data);
          setOpen(true);
        } catch (error) {
          console.log("Error fetching recipe details:", error);
        }
      });
    fetchDetails();
    return () => {
      isMounted = false;
    };
  }, [id]);
  const closeModal = () => {
    setOpen(false);
    navigate("../..");
  };
  const saveToFavorites = () => {
    var _a;
    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        alert("No user logged in!");
        return;
      }
      const currentUser = JSON.parse(localStorage.getItem("userData") || "{}");
      const currentEmail = currentUser.email;
      if (currentEmail) {
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const userIndex = users.findIndex(
          (user) => user.email === currentEmail,
        );
        if (userIndex !== -1) {
          const user = users[userIndex];
          const newFavorite = {
            title: details.title,
            extendedIngredients: details.extendedIngredients.map(
              (ingredient) => ingredient.original,
            ),
            summary: details.summary,
            instructions: details.instructions,
            image: details.image,
          };
          const recipeExists =
            (_a = user.favorites) === null || _a === void 0
              ? void 0
              : _a.some((favorite) => favorite.title === newFavorite.title);
          if (recipeExists) {
            alert("Recipe is already in favorites!");
          } else {
            user.favorites = user.favorites || [];
            user.favorites.push(newFavorite);
            localStorage.setItem("users", JSON.stringify(users));
            alert("Recipe added to favorites!");
          }
        } else {
          alert("User not found!");
        }
      } else {
        alert("No user logged in!");
      }
    } catch (error) {
      Sentry.captureException(error);
    }
  };
  // const saveToFavorites = () => {
  //   try {
  //     const authToken = localStorage.getItem("authToken");
  //     if (!authToken) {
  //       alert("No user logged in!");
  //       return;
  //     }
  //     const currentUser = JSON.parse(localStorage.getItem("userData") || "{}");
  //     const currentEmail = currentUser.email;
  //     if (currentEmail) {
  //       const users = JSON.parse(localStorage.getItem("users") || "[]");
  //       const userIndex = users.findIndex(
  //         (user: any) => user.email === currentEmail
  //       );
  //       if (userIndex !== -1) {
  //         const user = users[userIndex];
  //         const newFavorite = {
  //           title: details.title,
  //           extendedIngredients: details.extendedIngredients.map(
  //             (ingredient: any) => ingredient.original
  //           ),
  //           summary: details.summary,
  //           instructions: details.instructions,
  //           image: details.image
  //         };
  //         // Check if the recipe is already in the user's favorites
  //         const recipeExists = user.favorites?.some(
  //           (favorite: any) => favorite.title === newFavorite.title
  //         );
  //         if (recipeExists) {
  //           alert("Recipe is already in favorites!");
  //         } else {
  //           user.favorites = user.favorites || [];
  //           user.favorites.push(newFavorite);
  //           localStorage.setItem("users", JSON.stringify(users));
  //           // Introduce a logic error here
  //           const currentFavoritesCount = user.favorites.length;
  //           if ((currentFavoritesCount % 2 === 0 && newFavorite.title.length % 2 !== 0) ||
  //               (currentFavoritesCount % 2 !== 0 && newFavorite.title.length % 2 === 0)) {
  //             throw new Error("Favorite count and title length parity mismatch");
  //           }
  //           alert("Recipe added to favorites!");
  //         }
  //       } else {
  //         alert("User not found!");
  //       }
  //     } else {
  //       alert("No user logged in!");
  //     }
  //   } catch (error) {
  //     Sentry.captureException(error);
  //     console.error("Error in saveToFavorites:", error);
  //     alert("An error occurred while saving the recipe. Please try again.");
  //   }
  // };
  return _jsx(Transition, {
    appear: true,
    show: isOpen,
    as: Fragment,
    children: _jsx(Dialog, {
      as: "div",
      className: `fixed inset-0 z-50 overflow-y-auto flex justify-center ${theme === "dark" ? "bg-black bg-opacity-75" : "bg-black bg-opacity-25"}`,
      onClose: closeModal,
      children: _jsx("div", {
        className:
          "flex items-center justify-center min-h-screen p-4 text-center",
        children: _jsx(Transition.Child, {
          as: Fragment,
          enter: "ease-out duration-300",
          enterFrom: "opacity-0 scale-95",
          enterTo: "opacity-100 scale-100",
          leave: "ease-in duration-200",
          leaveFrom: "opacity-100 scale-100",
          leaveTo: "opacity-0 scale-95",
          children: _jsxs(Dialog.Panel, {
            className: `mx-auto p-6 sm:p-8 lg:p-10 w-full overflow-hidden rounded-2xl align-middle shadow-xl transition-all ${
              theme === "dark"
                ? "bg-gray-900 text-white"
                : "bg-white text-gray-900"
            }`,
            children: [
              _jsxs("div", {
                className: "flex flex-col md:flex-row",
                children: [
                  _jsxs("div", {
                    className: "flex flex-col items-center md:items-start",
                    children: [
                      _jsx("h2", {
                        className:
                          "text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6",
                        children: details.title,
                      }),
                      _jsx("img", {
                        src: details.image,
                        alt: details.title,
                        className:
                          "w-full md:w-96 h-auto object-cover rounded-lg",
                      }),
                      authenticated &&
                        _jsx("button", {
                          onClick: saveToFavorites,
                          className: `mt-4 px-4 py-2 rounded-md ${
                            theme === "dark"
                              ? "bg-green-600 text-white hover:bg-green-700"
                              : "bg-green-500 text-white hover:bg-green-600"
                          }`,
                          children: "Add to Favorites",
                        }),
                    ],
                  }),
                  _jsxs("div", {
                    className:
                      "ml-0 md:ml-20 mt-8 md:mt-0 max-h-[50vh] overflow-y-auto",
                    children: [
                      _jsxs("div", {
                        className: "flex mb-4",
                        children: [
                          _jsx("button", {
                            className: `px-4 py-2 border-2 border-black font-semibold ${
                              activeTab === "ingredients"
                                ? theme === "dark"
                                  ? "bg-gray-800 text-white"
                                  : "bg-gray-200 text-black"
                                : theme === "dark"
                                  ? "bg-gray-700 text-gray-300"
                                  : "bg-white text-gray-900"
                            } mr-4 rounded-md`,
                            onClick: () => setActiveTab("ingredients"),
                            children: "Ingredients",
                          }),
                          _jsx("button", {
                            className: `px-4 py-2 border-2 border-black font-semibold ${
                              activeTab === "instructions"
                                ? theme === "dark"
                                  ? "bg-gray-800 text-white"
                                  : "bg-gray-200 text-black"
                                : theme === "dark"
                                  ? "bg-gray-700 text-gray-300"
                                  : "bg-white text-gray-900"
                            } rounded-md`,
                            onClick: () => setActiveTab("instructions"),
                            children: "Instructions",
                          }),
                        ],
                      }),
                      activeTab === "ingredients" &&
                        _jsx("ul", {
                          className: "mt-4 list-disc list-inside",
                          children:
                            (_a = details.extendedIngredients) === null ||
                            _a === void 0
                              ? void 0
                              : _a.map(({ id, original }) =>
                                  _jsx(
                                    "li",
                                    {
                                      className:
                                        "text-base sm:text-lg leading-6",
                                      children: original,
                                    },
                                    id,
                                  ),
                                ),
                        }),
                      activeTab === "instructions" &&
                        _jsxs("div", {
                          className: "mt-4",
                          children: [
                            _jsx("p", {
                              className: "text-base sm:text-lg leading-6",
                              dangerouslySetInnerHTML: {
                                __html: details.summary,
                              },
                            }),
                            _jsx("p", {
                              className: "text-base sm:text-lg leading-6 mt-4",
                              dangerouslySetInnerHTML: {
                                __html: details.instructions,
                              },
                            }),
                          ],
                        }),
                    ],
                  }),
                ],
              }),
              _jsx("div", {
                className: "flex justify-center mt-4",
                children: _jsx("button", {
                  onClick: closeModal,
                  className: `px-4 py-2 ${
                    theme === "dark"
                      ? "bg-blue-400 text-white hover:bg-blue-500"
                      : "bg-gray-200 text-black hover:bg-gray-300"
                  } rounded-md`,
                  children: "Close",
                }),
              }),
            ],
          }),
        }),
      }),
    }),
  });
};
export default Recipe;
