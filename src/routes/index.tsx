import { createBrowserRouter, RouteObject, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import SearchRecipe from "../pages/Search/SearchedRecipe";
import Recipe from "../pages/Recipe/Recipe";
import Signin from "../pages/signin";
import Signup from "../pages/signup";
import Logout from "../pages/logout";
import Favorites from "../pages/Favorites/Favorites";
// import Favorites from "../pages/Favorites/Favorites";

const routes: RouteObject[] = [
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
  {
    path: "/user/sign-in",
    element: <Signin />,
  },
  {
    path: "/sign-up",
    element: <Signup />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },

  {
    path: "/",
    element: <Home />,
    children: [
      { index: true, element: <></> },
      {
        path: "search",
        children: [
          { index: true, element: <Navigate to="/" replace /> },
          {
            path: ":query",
            element: <SearchRecipe />,
          },
        ],
      },
      {
        path: "recipe",
        children: [
          { index: true, element: <Navigate to="/" replace /> },
          {
            path: ":id",
            element: <Recipe />,
          },
        ],
      },
      {
        path: "user",
        children: [
          { index: true, element: <Navigate to="/" replace /> },
          {
            path: "favorites",
            element: <Favorites />,
          },
        ],
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
