import {
  jsx as _jsx,
  Fragment as _Fragment,
  jsxs as _jsxs,
} from "react/jsx-runtime";
import { Outlet } from "react-router-dom";
import Appbar from "./Appbar";
const Header = () => {
  return _jsxs(_Fragment, {
    children: [_jsx(Appbar, {}), _jsx("main", { children: _jsx(Outlet, {}) })],
  });
};
export default Header;
