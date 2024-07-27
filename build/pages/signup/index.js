import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import SignupForm from "./SignupForm";
const Signup = () => {
  return _jsx("div", {
    className: "min-h-screen flex items-center justify-center bg-gray-100",
    children: _jsxs("div", {
      className: "max-w-md w-full px-6 py-8 bg-white rounded-lg shadow-md",
      children: [
        _jsx("h1", {
          className:
            "text-3xl font-bold text-center text-gray-800 mb-8 font-mono",
          children: "Register",
        }),
        _jsx(SignupForm, {}),
      ],
    }),
  });
};
export default Signup;
