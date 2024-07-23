/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
};

const SigninForm: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      // Retrieve user data from local storage
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find(
        (user: any) =>
          user.email === data.email && user.password === data.password
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
    } catch (error: any) {
      console.error("Sign-in failed:", error);
      setErrorMessage(error.message || "Sign-in failed. Please try again.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-gray-700 font-semibold mb-2 font-mono" htmlFor="email">
            Email:
          </label>
          <input
            {...register("email", {
              required: "Email is required",
            })}
            type="email"
            name="email"
            id="email"
            autoComplete="email"
            placeholder="Enter your email"
            className={`w-full border font-mono rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${errors.email ? "border-red-500" : ""}`}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2 font-mono" htmlFor="password">
            Password:
          </label>
          <input
            {...register("password", { required: "Password is required" })}
            type="password"
            name="password"
            id="password"
            autoComplete="password"
            placeholder="Enter your password"
            className={`w-full border font-mono rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${errors.password ? "border-red-500" : ""}`}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full font-mono bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4"
        >
          Sign In
        </button>
      </form>
      <p className="mt-8 font-mono text-black">
        Need an account?{" "}
        <Link
          to="/sign-up"
          className="text-blue-500 hover:text-blue-700 font-semibold"
        >
          Create an account
        </Link>
      </p>
      <p className="mt-5 font-mono mb-2">
        <Link
          to="/"
          className="text-blue-500 hover:text-blue-700 font-semibold"
        >
          Back to Home
        </Link>
      </p>

      {errorMessage && (
        <p className="text-red-500 font-semibold font-mono">{errorMessage}</p>
      )}
    </>
  );
};

export default SigninForm;
