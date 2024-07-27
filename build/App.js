import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { Suspense, useContext } from "react";
import router from "./routes";
import { ThemeContext } from "./context/theme";
import "./i18n";
import { RecipeProvider } from "./context/Recipes/context";
function App() {
  const { theme } = useContext(ThemeContext);
  return _jsx(_Fragment, {
    children: _jsx(Suspense, {
      fallback: _jsx(_Fragment, { children: "Loading..." }),
      children: _jsx("div", {
        className: `h-screen w-full ${theme === "dark" ? "dark:bg-black" : ""}`,
        children: _jsx(RecipeProvider, {
          children: _jsx(RouterProvider, { router: router }),
        }),
      }),
    }),
  });
}
export default App;
