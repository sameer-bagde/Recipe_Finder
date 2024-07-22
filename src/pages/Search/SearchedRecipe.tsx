/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Fragment, useContext, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { fetchRecipesBySearch } from "../../context/Recipes/action";
import { Dialog, Transition } from "@headlessui/react";
import { ThemeContext } from "../../context/theme";

const SearchRecipe: React.FC = () => {
  const { query } = useParams<{ query: string }>();
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setOpen] = useState(false);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (query) {
        try {
          const fetchedResults = await fetchRecipesBySearch(query);
          setResults(fetchedResults);
          setOpen(true);
        } catch (error) {
          setError("");
        }
      }
    };

    fetchData();
  }, [query]);

  const closeModal = () => {
    setOpen(false);
    navigate("../..");
  };

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto flex justify-center bg-black bg-opacity-25"
        onClose={closeModal}
      >
        <div className="flex items-center justify-center max-h-2xl">
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
              className={`mx-auto m-auto p-10 w-full max-w-3xl transform overflow-hidden rounded-2xl align-middle shadow-xl transition-all ${
                theme === "dark" ? "bg-gray-800" : "bg-white"
              }`}
            >
              <div className="container mx-auto">
                <div className="text-indigo-600 flex items-center pb-2 pr-2 border-b-2 border-indigo-600 uppercase">
                  <p className="font-semibold inline-block">Search Result</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4">
                  {results.length > 0 ? (
                    results.map((recipe: any) => (
                      <div
                        key={recipe.id}
                        className="relative bg-gray-200 rounded-lg p-4"
                      >
                        <img
                          src={recipe.image}
                          alt={recipe.title}
                          className="w-full h-40 object-cover rounded-lg mb-2"
                        />
                        <p className="text-base font-medium text-gray-800">
                          {recipe.title}
                        </p>
                        <Link
                          to={`/recipe/${recipe.id}`}
                          className="no-underline"
                        >
                          <div
                            className={`px-6 py-3 flex flex-col items-center rounded-xl justify-center ${
                              theme === "dark"
                                ? "bg-gray-700 text-gray-300 hover:bg-gray-800"
                                : "bg-slate-700 text-slate-200 hover:bg-slate-600"
                            }`}
                          >
                            <p className="font-mono">Recipe</p>
                          </div>
                        </Link>
                      </div>
                    ))
                  ) : (
                    <p>No recipes found</p>
                  )}
                </div>
                <div className="story-read-more-wrapper pt-2">
                  <div className="flex justify-center">
                    <button
                      onClick={closeModal}
                      className={`px-4 py-2 ${
                        theme === "dark"
                          ? "bg-blue-400"
                          : "bg-gray-200 hover:bg-gray-400"
                      } rounded-md`}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SearchRecipe;
