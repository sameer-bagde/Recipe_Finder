/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useContext, Fragment } from "react";
import { ThemeContext } from "../../context/theme";
import { useTranslation } from "react-i18next";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";

interface RecipeDetails {
  title: string;
  extendedIngredients: string[];
  summary: string;
  instructions: string[];
  image: string;
}

const Favorites: React.FC = () => {
  const [isOpen, setOpen] = useState(true); // set default to true to show the modal initially
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [favorites, setFavorites] = useState<RecipeDetails[]>([]);
  const [activeTab, setActiveTab] = useState<string | null>(null);

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
      const userIndex = users.findIndex(
        (user: any) => user.email === currentEmail,
      );

      // Find the current user
      if (userIndex !== -1) {
        const user = users[userIndex];
        if (user && user.favorites) {
          setFavorites(user.favorites);
        }
      }
    }
  }, []);

  const handleDeleteFavorite = (index: number) => {
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
    const userIndex = users.findIndex(
      (user: any) => user.email === currentEmail,
    );

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

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50"
        onClose={closeModal}
      >
        <div className="flex items-center justify-center min-h-screen p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel
              className={`relative mx-auto max-w-4xl w-full transform overflow-hidden rounded-2xl align-middle shadow-xl transition-all ${
                theme === "dark"
                  ? "bg-gray-900 text-gray-100"
                  : "bg-white text-black"
              }`}
            >
              <div className="flex flex-col max-h-[80vh] overflow-hidden">
                <div
                  className={`bg-gray-800 p-4 rounded-t-2xl flex-shrink-0 ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}
                >
                  <h1
                    className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 ${theme === "dark" ? "text-gray-100" : "text-gray-900"}`}
                  >
                    {t("Favorite Recipes")}
                  </h1>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                  {favorites.length === 0 ? (
                    <p
                      className={`${theme === "dark" ? "text-gray-400" : "text-gray-800"}`}
                    >
                      {t("No favorite recipes found.")}
                    </p>
                  ) : (
                    favorites.map((recipe, index) => (
                      <div
                        key={index}
                        className={`rounded-lg shadow-md p-6 mb-8 ${theme === "dark" ? "bg-gray-800" : "bg-white"} overflow-hidden`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex">
                            <img
                              src={recipe.image}
                              alt={recipe.title}
                              className="w-32 h-32 object-cover rounded-lg mr-4"
                            />
                            <div>
                              <h2
                                className={`text-xl sm:text-2xl lg:text-3xl font-bold mb-2 ${theme === "dark" ? "text-gray-100" : "text-gray-900"}`}
                              >
                                {recipe.title}
                              </h2>
                            </div>
                          </div>
                          <button
                            onClick={() => handleDeleteFavorite(index)}
                            className={`px-4 py-2 rounded-md ${theme === "dark" ? "bg-red-600 text-white" : "bg-red-500 text-white"}`}
                          >
                            {t("Delete")}
                          </button>
                        </div>

                        <div className="mt-6">
                          <div className="flex justify-center mb-4 gap-4">
                            <button
                              className={`px-4 py-2 border-2 font-semibold ${
                                activeTab === `ingredients-${index}`
                                  ? theme === "dark"
                                    ? "bg-gray-700 text-gray-100 border-gray-700"
                                    : "bg-gray-200 text-black border-gray-200"
                                  : theme === "dark"
                                    ? "bg-gray-600 text-gray-300 border-gray-600"
                                    : "bg-white text-gray-900 border-gray-900"
                              } rounded-md`}
                              onClick={() =>
                                setActiveTab(`ingredients-${index}`)
                              }
                            >
                              {t("Ingredients")}
                            </button>
                            <button
                              className={`px-4 py-2 border-2 font-semibold ${
                                activeTab === `instructions-${index}`
                                  ? theme === "dark"
                                    ? "bg-gray-700 text-gray-100 border-gray-700"
                                    : "bg-gray-200 text-black border-gray-200"
                                  : theme === "dark"
                                    ? "bg-gray-600 text-gray-300 border-gray-600"
                                    : "bg-white text-gray-900 border-gray-900"
                              } rounded-md`}
                              onClick={() =>
                                setActiveTab(`instructions-${index}`)
                              }
                            >
                              {t("Instructions")}
                            </button>
                          </div>
                          {activeTab === `ingredients-${index}` && (
                            <ul className="mt-4 list-disc list-inside text-center max-h-[30vh] overflow-y-auto">
                              {recipe.extendedIngredients.map(
                                (ingredient, i) => (
                                  <li
                                    key={i}
                                    className={`text-base sm:text-lg leading-6 ${theme === "dark" ? "text-gray-300" : "text-gray-800"}`}
                                  >
                                    {ingredient}
                                  </li>
                                ),
                              )}
                            </ul>
                          )}
                          {activeTab === `instructions-${index}` && (
                            <div className="mt-4 text-center max-h-[30vh] overflow-y-auto">
                              <p
                                className={`text-base sm:text-lg leading-6 ${theme === "dark" ? "text-gray-300" : "text-gray-800"}`}
                                dangerouslySetInnerHTML={{
                                  __html: recipe.summary,
                                }}
                              ></p>
                              <p
                                className={`text-base sm:text-lg leading-6 mt-4 ${theme === "dark" ? "text-gray-300" : "text-gray-800"}`}
                                dangerouslySetInnerHTML={{
                                  __html: recipe.instructions,
                                }}
                              ></p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <div
                  className={`flex justify-center mt-6 mb-4 p-4 rounded-b-2xl ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}
                >
                  <button
                    onClick={closeModal}
                    className={`px-4 py-2 ${
                      theme === "dark"
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    } rounded-md`}
                  >
                    {t("Close")}
                  </button>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Favorites;
