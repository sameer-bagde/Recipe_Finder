import { RouterProvider } from "react-router-dom";
import "./App.css";
import { Suspense, useContext } from "react";
import router from "./routes";
import { ThemeContext } from "./context/theme";
import "./i18n";
import { RecipeProvider } from "./context/Recipes/context";

function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <Suspense fallback={<>Loading...</>}>
        <div
          className={`h-screen w-full ${theme === "dark" ? "dark:bg-black" : ""}`}
        >
          <RecipeProvider>
            <RouterProvider router={router} />
          </RecipeProvider>
        </div>
      </Suspense> 
    </>
  );
}

export default App;
