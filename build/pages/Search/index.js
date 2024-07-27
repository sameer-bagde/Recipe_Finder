import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import SearchBar from "./SearchBar";
const Search = () => {
  return _jsx(_Fragment, {
    children: _jsx("div", {
      className: "w-full",
      children: _jsx("div", {
        className: "w-full",
        children: _jsx(SearchBar, {}),
      }),
    }),
  });
};
export default Search;
