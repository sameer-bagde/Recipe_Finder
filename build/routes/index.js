import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import SearchRecipe from "../pages/Search/SearchedRecipe";
import Recipe from "../pages/Recipe/Recipe";
import Signin from "../pages/signin";
import Signup from "../pages/signup";
import Logout from "../pages/logout";
import Favorites from "../pages/Favorites/Favorites";
// import Favorites from "../pages/Favorites/Favorites";
const routes = [
  {
    path: "*",
    element: _jsx(Navigate, { to: "/", replace: true }),
  },
  {
    path: "/user/sign-in",
    element: _jsx(Signin, {}),
  },
  {
    path: "/user/sign-up",
    element: _jsx(Signup, {}),
  },
  {
    path: "/logout",
    element: _jsx(Logout, {}),
  },
  {
    path: "/",
    element: _jsx(Home, {}),
    children: [
      { index: true, element: _jsx(_Fragment, {}) },
      {
        path: "search",
        children: [
          { index: true, element: _jsx(Navigate, { to: "/", replace: true }) },
          {
            path: ":query",
            element: _jsx(SearchRecipe, {}),
          },
        ],
      },
      {
        path: "recipe",
        children: [
          { index: true, element: _jsx(Navigate, { to: "/", replace: true }) },
          {
            path: ":id",
            element: _jsx(Recipe, {}),
          },
        ],
      },
      {
        path: "user",
        children: [
          { index: true, element: _jsx(Navigate, { to: "/", replace: true }) },
          {
            path: "favorites",
            element: _jsx(Favorites, {}),
          },
        ],
      },
    ],
  },
];
const router = createBrowserRouter(routes);
export default router;
