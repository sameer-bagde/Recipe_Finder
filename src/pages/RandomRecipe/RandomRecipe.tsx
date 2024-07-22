import React, { useEffect, useState, useContext } from "react";
import {
  useRecipeDispatch,
  useRecipeState,
} from "../../context/Recipes/context";
import { fetchRandomRecipes } from "../../context/Recipes/action";
import { ThemeContext } from "../../context/theme";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const RandomRecipes: React.FC = () => {
  const dispatch = useRecipeDispatch();
  const { recipes, isLoading, isError } = useRecipeState();
  const { theme } = useContext(ThemeContext);
  const [visibleRecipes, setVisibleRecipes] = useState<number>(12);
  const { t } = useTranslation();

  useEffect(() => {
    fetchRandomRecipes(dispatch);
  }, [dispatch]);

  const handleLoadMore = () => {
    setVisibleRecipes((prev) => prev + 12);
  };

  return (
    <div
      className={`flex flex-col ${theme === "dark" ? "dark:bg-black text-gray-200" : "bg-white text-gray-800"} m-auto p-auto`}
    >
      <div className="py-3 px-14">
        <div className="text-indigo-600 flex items-center pb-2 pr-2 border-b-2 border-indigo-600 uppercase">
          <svg
            className="h-6 mr-3"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 455.005 455.005"
            xmlSpace="preserve"
          >
            <g>
              <path d="M446.158,267.615c-5.622-3.103-12.756-2.421-19.574,1.871l-125.947,79.309c-3.505,2.208-4.557,6.838-2.35,10.343 c2.208,3.505,6.838,4.557,10.343,2.35l125.947-79.309c2.66-1.675,4.116-1.552,4.331-1.432c0.218,0.12,1.096,1.285,1.096,4.428 c0,8.449-6.271,19.809-13.42,24.311l-122.099,76.885c-6.492,4.088-12.427,5.212-16.284,3.084c-3.856-2.129-6.067-7.75-6.067-15.423 c0-19.438,13.896-44.61,30.345-54.967l139.023-87.542c2.181-1.373,3.503-3.77,3.503-6.347s-1.323-4.974-3.503-6.347L184.368,50.615 c-2.442-1.538-5.551-1.538-7.993,0L35.66,139.223C15.664,151.815,0,180.188,0,203.818v4c0,23.63,15.664,52.004,35.66,64.595 l209.292,131.791c3.505,2.207,8.136,1.154,10.343-2.35c2.207-3.505,1.155-8.136-2.35-10.343L43.653,259.72 C28.121,249.941,15,226.172,15,207.818v-4c0-18.354,13.121-42.122,28.653-51.902l136.718-86.091l253.059,159.35l-128.944,81.196 c-20.945,13.189-37.352,42.909-37.352,67.661c0,13.495,4.907,23.636,13.818,28.555c3.579,1.976,7.526,2.956,11.709,2.956 c6.231,0,12.985-2.176,19.817-6.479l122.099-76.885c11.455-7.213,20.427-23.467,20.427-37.004 C455.004,277.119,451.78,270.719,446.158,267.615z">
                {" "}
              </path>
              <path d="M353.664,232.676c2.492,0,4.928-1.241,6.354-3.504c2.207-3.505,1.155-8.136-2.35-10.343l-173.3-109.126 c-3.506-2.207-8.136-1.154-10.343,2.35c-2.207,3.505-1.155,8.136,2.35,10.343l173.3,109.126 C350.916,232.303,352.298,232.676,353.664,232.676z">
                {" "}
              </path>
              <path d="M323.68,252.58c2.497,0,4.938-1.246,6.361-3.517c2.201-3.509,1.14-8.138-2.37-10.338L254.46,192.82 c-3.511-2.202-8.139-1.139-10.338,2.37c-2.201,3.51-1.14,8.138,2.37,10.338l73.211,45.905 C320.941,252.21,322.318,252.58,323.68,252.58z">
                {" "}
              </path>
              <path d="M223.903,212.559c-3.513-2.194-8.14-1.124-10.334,2.39c-2.194,3.514-1.124,8.14,2.39,10.334l73.773,46.062 c1.236,0.771,2.608,1.139,3.965,1.139c2.501,0,4.947-1.251,6.369-3.529c2.194-3.514,1.124-8.14-2.39-10.334L223.903,212.559z">
                {" "}
              </path>
              <path d="M145.209,129.33l-62.33,39.254c-2.187,1.377-3.511,3.783-3.503,6.368s1.345,4.983,3.54,6.348l74.335,46.219 c1.213,0.754,2.586,1.131,3.96,1.131c1.417,0,2.833-0.401,4.071-1.201l16.556-10.7c3.479-2.249,4.476-6.891,2.228-10.37 c-2.248-3.479-6.891-4.475-10.37-2.228l-12.562,8.119l-60.119-37.38l48.2-30.355l59.244,37.147l-6.907,4.464 c-3.479,2.249-4.476,6.891-2.228,10.37c2.249,3.479,6.894,4.476,10.37,2.228l16.8-10.859c2.153-1.392,3.446-3.787,3.429-6.351 c-0.018-2.563-1.344-4.94-3.516-6.302l-73.218-45.909C150.749,127.792,147.647,127.795,145.209,129.33z">
                {" "}
              </path>
              <path d="M270.089,288.846c2.187-3.518,1.109-8.142-2.409-10.329l-74.337-46.221c-3.518-2.188-8.143-1.109-10.329,2.409 c-2.187,3.518-1.109,8.142,2.409,10.329l74.337,46.221c1.232,0.767,2.601,1.132,3.953,1.132 C266.219,292.387,268.669,291.131,270.089,288.846z">
                {" "}
              </path>
              <path d="M53.527,192.864c-2.187,3.518-1.109,8.142,2.409,10.329l183.478,114.081c1.232,0.767,2.601,1.132,3.953,1.132 c2.506,0,4.956-1.256,6.376-3.541c2.187-3.518,1.109-8.142-2.409-10.329L63.856,190.455 C60.338,188.266,55.714,189.346,53.527,192.864z">
                {" "}
              </path>
            </g>
          </svg>
          <p className="font-semibold inline-block">{t("RANDOM RECIPE")}</p>
        </div>
        <br />
        <div>
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="w-96">
                <div className="max-w-sm rounded overflow-hidden shadow-lg animate-pulse">
                  <div className="h-48 bg-gray-300"></div>
                  <div className="px-6 py-4">
                    <div className="h-6 bg-gray-300 mb-2"></div>
                    <div className="h-4 bg-gray-300 w-2/3"></div>
                  </div>
                  <div className="px-6 pt-4 pb-2">
                    <div className="h-4 bg-gray-300 w-1/4 mb-2"></div>
                    <div className="h-4 bg-gray-300 w-1/2"></div>
                  </div>
                </div>
              </div>
            </div>
          ) : isError ? (
            <p>{t("Unable to Load Recipes")}</p>
          ) : (
            recipes &&
            recipes.length > 0 && (
              <>
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {recipes.slice(0, visibleRecipes).map((recipe) => (
                    <div
                      key={recipe.id}
                      className={`overflow-hidden rounded-xl shadow-lg flex flex-col ${theme === "dark" ? "bg-slate-900" : "bg-white"}`}
                    >
                      <div className="relative">
                        <img
                          className="w-full rounded-xl"
                          src={recipe.image}
                          alt={recipe.title}
                        />
                      </div>
                      <div className="px-6 py-4 mb-auto">
                        <p
                          className={`font-medium text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out mb-2 ${theme === "dark" ? "text-white" : "text-black"}`}
                        >
                          {recipe.title}
                        </p>
                      </div>
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
                          <p className="font-mono">{t("Recipe")}</p>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
                {visibleRecipes < recipes.length && (
                  <div className="flex justify-center mt-10">
                    <button
                      onClick={handleLoadMore}
                      className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75"
                    >
                      {t("Load More")}
                    </button>
                  </div>
                )}
              </>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default RandomRecipes;
