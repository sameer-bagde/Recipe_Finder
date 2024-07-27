import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useContext, Fragment } from "react";
import { ThemeContext } from "../../context/theme";
import { useTranslation } from "react-i18next";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
const Favorites = () => {
  const [isOpen, setOpen] = useState(true); // set default to true to show the modal initially
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [favorites, setFavorites] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  useEffect(() => {
    // Retrieve current user
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      alert("No user logged in!");
      return;
    }
    const currentUser = JSON.parse(localStorage.getItem("userData") || "{}");
    const currentEmail = currentUser.email;
    if (currentEmail) {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const userIndex = users.findIndex((user) => user.email === currentEmail);
      // Find the current user
      if (userIndex !== -1) {
        const user = users[userIndex];
        if (user && user.favorites) {
          setFavorites(user.favorites);
        }
      }
    }
  }, []);
  const handleDeleteFavorite = (index) => {
    // Retrieve current user
    const currentUserString = localStorage.getItem("userData");
    if (!currentUserString) {
      console.error("No currentUser found in local storage");
      return;
    }
    const currentUser = JSON.parse(currentUserString);
    const currentEmail = currentUser.email;
    // Get existing users
    const usersString = localStorage.getItem("users");
    if (!usersString) {
      console.error("No users found in local storage");
      return;
    }
    const users = JSON.parse(usersString);
    // Find the current user
    const userIndex = users.findIndex((user) => user.email === currentEmail);
    if (userIndex !== -1) {
      // Remove the favorite recipe from the user's favorites
      const updatedFavorites = [...favorites];
      updatedFavorites.splice(index, 1);
      setFavorites(updatedFavorites);
      // Update the user's favorites in the users array
      users[userIndex].favorites = updatedFavorites;
      // Update local storage
      localStorage.setItem("users", JSON.stringify(users));
    }
  };
  const closeModal = () => {
    setOpen(false);
    navigate("../..");
  };
  return _jsx(Transition, {
    appear: true,
    show: isOpen,
    as: Fragment,
    children: _jsx(Dialog, {
      as: "div",
      className:
        "fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50",
      onClose: closeModal,
      children: _jsx("div", {
        className: "flex items-center justify-center min-h-screen p-4",
        children: _jsx(Transition.Child, {
          as: Fragment,
          enter: "ease-out duration-300",
          enterFrom: "opacity-0 scale-95",
          enterTo: "opacity-100 scale-100",
          leave: "ease-in duration-200",
          leaveFrom: "opacity-100 scale-100",
          leaveTo: "opacity-0 scale-95",
          children: _jsx(Dialog.Panel, {
            className: `relative mx-auto max-w-4xl w-full transform overflow-hidden rounded-2xl align-middle shadow-xl transition-all ${
              theme === "dark"
                ? "bg-gray-900 text-gray-100"
                : "bg-white text-black"
            }`,
            children: _jsxs("div", {
              className: "flex flex-col max-h-[80vh] overflow-hidden",
              children: [
                _jsx("div", {
                  className: `bg-gray-800 p-4 rounded-t-2xl flex-shrink-0 ${theme === "dark" ? "bg-gray-900" : "bg-white"}`,
                  children: _jsx("h1", {
                    className: `text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 ${theme === "dark" ? "text-gray-100" : "text-gray-900"}`,
                    children: t("Favorite Recipes"),
                  }),
                }),
                _jsx("div", {
                  className: "flex-1 overflow-y-auto p-4",
                  children:
                    favorites.length === 0
                      ? _jsx("p", {
                          className: `${theme === "dark" ? "text-gray-400" : "text-gray-800"}`,
                          children: t("No favorite recipes found."),
                        })
                      : favorites.map((recipe, index) =>
                          _jsxs(
                            "div",
                            {
                              className: `rounded-lg shadow-md p-6 mb-8 ${theme === "dark" ? "bg-gray-800" : "bg-white"} overflow-hidden`,
                              children: [
                                _jsxs("div", {
                                  className: "flex justify-between items-start",
                                  children: [
                                    _jsxs("div", {
                                      className: "flex",
                                      children: [
                                        _jsx("img", {
                                          src: recipe.image,
                                          alt: recipe.title,
                                          className:
                                            "w-32 h-32 object-cover rounded-lg mr-4",
                                        }),
                                        _jsx("div", {
                                          children: _jsx("h2", {
                                            className: `text-xl sm:text-2xl lg:text-3xl font-bold mb-2 ${theme === "dark" ? "text-gray-100" : "text-gray-900"}`,
                                            children: recipe.title,
                                          }),
                                        }),
                                      ],
                                    }),
                                    _jsx("button", {
                                      onClick: () =>
                                        handleDeleteFavorite(index),
                                      className: `px-4 py-2 rounded-md ${theme === "dark" ? "bg-red-600 text-white" : "bg-red-500 text-white"}`,
                                      children: t("Delete"),
                                    }),
                                  ],
                                }),
                                _jsxs("div", {
                                  className: "mt-6",
                                  children: [
                                    _jsxs("div", {
                                      className:
                                        "flex justify-center mb-4 gap-4",
                                      children: [
                                        _jsx("button", {
                                          className: `px-4 py-2 border-2 font-semibold ${
                                            activeTab === `ingredients-${index}`
                                              ? theme === "dark"
                                                ? "bg-gray-700 text-gray-100 border-gray-700"
                                                : "bg-gray-200 text-black border-gray-200"
                                              : theme === "dark"
                                                ? "bg-gray-600 text-gray-300 border-gray-600"
                                                : "bg-white text-gray-900 border-gray-900"
                                          } rounded-md`,
                                          onClick: () =>
                                            setActiveTab(
                                              `ingredients-${index}`,
                                            ),
                                          children: t("Ingredients"),
                                        }),
                                        _jsx("button", {
                                          className: `px-4 py-2 border-2 font-semibold ${
                                            activeTab ===
                                            `instructions-${index}`
                                              ? theme === "dark"
                                                ? "bg-gray-700 text-gray-100 border-gray-700"
                                                : "bg-gray-200 text-black border-gray-200"
                                              : theme === "dark"
                                                ? "bg-gray-600 text-gray-300 border-gray-600"
                                                : "bg-white text-gray-900 border-gray-900"
                                          } rounded-md`,
                                          onClick: () =>
                                            setActiveTab(
                                              `instructions-${index}`,
                                            ),
                                          children: t("Instructions"),
                                        }),
                                      ],
                                    }),
                                    activeTab === `ingredients-${index}` &&
                                      _jsx("ul", {
                                        className:
                                          "mt-4 list-disc list-inside text-center max-h-[30vh] overflow-y-auto",
                                        children:
                                          recipe.extendedIngredients.map(
                                            (ingredient, i) =>
                                              _jsx(
                                                "li",
                                                {
                                                  className: `text-base sm:text-lg leading-6 ${theme === "dark" ? "text-gray-300" : "text-gray-800"}`,
                                                  children: ingredient,
                                                },
                                                i,
                                              ),
                                          ),
                                      }),
                                    activeTab === `instructions-${index}` &&
                                      _jsxs("div", {
                                        className:
                                          "mt-4 text-center max-h-[30vh] overflow-y-auto",
                                        children: [
                                          _jsx("p", {
                                            className: `text-base sm:text-lg leading-6 ${theme === "dark" ? "text-gray-300" : "text-gray-800"}`,
                                            dangerouslySetInnerHTML: {
                                              __html: recipe.summary,
                                            },
                                          }),
                                          _jsx("p", {
                                            className: `text-base sm:text-lg leading-6 mt-4 ${theme === "dark" ? "text-gray-300" : "text-gray-800"}`,
                                            dangerouslySetInnerHTML: {
                                              __html: recipe.instructions,
                                            },
                                          }),
                                        ],
                                      }),
                                  ],
                                }),
                              ],
                            },
                            index,
                          ),
                        ),
                }),
                _jsx("div", {
                  className: `flex justify-center mt-6 mb-4 p-4 rounded-b-2xl ${theme === "dark" ? "bg-gray-900" : "bg-white"}`,
                  children: _jsx("button", {
                    onClick: closeModal,
                    className: `px-4 py-2 ${
                      theme === "dark"
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    } rounded-md`,
                    children: t("Close"),
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
export default Favorites;
