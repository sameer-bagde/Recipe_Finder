import { jsx as _jsx } from "react/jsx-runtime";
// src/context/theme.tsx
import { createContext, useState } from "react";
const ThemeContext = createContext({
  theme: "light",
  setTheme: () => {},
});
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const valueToShare = {
    theme,
    setTheme,
  };
  return _jsx(ThemeContext.Provider, {
    value: valueToShare,
    children: children,
  });
};
export { ThemeContext, ThemeProvider };
