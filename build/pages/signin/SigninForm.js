var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
import {
  jsx as _jsx,
  jsxs as _jsxs,
  Fragment as _Fragment,
} from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
const SigninForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [errorMessage, setErrorMessage] = useState(null);
  const onSubmit = (data) =>
    __awaiter(void 0, void 0, void 0, function* () {
      try {
        // Retrieve user data from local storage
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const user = users.find(
          (user) =>
            user.email === data.email && user.password === data.password,
        );
        if (!user) {
          throw new Error("Invalid email or password");
        }
        console.log("Sign-in successful");
        const authToken = btoa(data.email + ":" + data.password); // Basic encoding for demonstration
        localStorage.setItem("authToken", authToken);
        localStorage.setItem("userData", JSON.stringify(user));
        navigate("/");
        console.log(data);
      } catch (error) {
        console.error("Sign-in failed:", error);
        setErrorMessage(error.message || "Sign-in failed. Please try again.");
      }
    });
  return _jsxs(_Fragment, {
    children: [
      _jsxs("form", {
        onSubmit: handleSubmit(onSubmit),
        children: [
          _jsxs("div", {
            children: [
              _jsx("label", {
                className: "block text-gray-700 font-semibold mb-2 font-mono",
                htmlFor: "email",
                children: "Email:",
              }),
              _jsx(
                "input",
                Object.assign(
                  {},
                  register("email", {
                    required: "Email is required",
                  }),
                  {
                    type: "email",
                    name: "email",
                    id: "email",
                    autoComplete: "email",
                    placeholder: "Enter your email",
                    className: `w-full border font-mono rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${errors.email ? "border-red-500" : ""}`,
                  },
                ),
              ),
              errors.email &&
                _jsx("p", {
                  className: "text-red-500",
                  children: errors.email.message,
                }),
            ],
          }),
          _jsxs("div", {
            children: [
              _jsx("label", {
                className: "block text-gray-700 font-semibold mb-2 font-mono",
                htmlFor: "password",
                children: "Password:",
              }),
              _jsx(
                "input",
                Object.assign(
                  {},
                  register("password", { required: "Password is required" }),
                  {
                    type: "password",
                    name: "password",
                    id: "password",
                    autoComplete: "password",
                    placeholder: "Enter your password",
                    className: `w-full border font-mono rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${errors.password ? "border-red-500" : ""}`,
                  },
                ),
              ),
              errors.password &&
                _jsx("p", {
                  className: "text-red-500",
                  children: errors.password.message,
                }),
            ],
          }),
          _jsx("button", {
            type: "submit",
            className:
              "w-full font-mono bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4",
            children: "Sign In",
          }),
        ],
      }),
      _jsxs("p", {
        className: "mt-8 font-mono text-black",
        children: [
          "Need an account?",
          " ",
          _jsx(Link, {
            to: "/sign-up",
            className: "text-blue-500 hover:text-blue-700 font-semibold",
            children: "Create an account",
          }),
        ],
      }),
      _jsx("p", {
        className: "mt-5 font-mono mb-2",
        children: _jsx(Link, {
          to: "/",
          className: "text-blue-500 hover:text-blue-700 font-semibold",
          children: "Back to Home",
        }),
      }),
      errorMessage &&
        _jsx("p", {
          className: "text-red-500 font-semibold font-mono",
          children: errorMessage,
        }),
    ],
  });
};
export default SigninForm;
