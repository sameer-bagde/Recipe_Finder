import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
const Logout = () => {
  useEffect(() => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
  }, []);
  return _jsx(Navigate, { to: "/" });
};
export default Logout;
