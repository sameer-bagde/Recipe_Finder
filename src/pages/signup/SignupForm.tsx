/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  name: string;
  email: string;
  password: string;
};

const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      
      const userExists = users.some((user: any) => user.email === data.email);

      if (userExists) {
        throw new Error("User with this email already exists");
      }

      users.push({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      localStorage.setItem("users", JSON.stringify(users));

      console.log("Sign-up successful");
      const authToken = btoa(`${data.email}:${data.password}`); // Basic encoding for demonstration
      localStorage.setItem("authToken", authToken);
      localStorage.setItem("userData", JSON.stringify({ name: data.name, email: data.email }));


      navigate("/");

      console.log(data);
    } catch (error: any) {
      console.error("Sign-up failed:", error);
      setErrorMessage(error.message || "Sign-up failed. Please try again.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label
            htmlFor="name"
            className="block font-mono text-gray-700 font-semibold mb-2"
          >
            Your Name:
          </label>
          <input
            {...register("name", { required: "Name is required" })}
            type="text"
            id="name"
            placeholder="Enter your name"
            autoComplete="name"
            className={`w-full font-mono border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${errors.name ? "border-red-500" : ""}`}
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        <div>
          <label
            htmlFor="email"
            className="block font-mono text-gray-700 font-semibold mb-2"
          >
            Email:
          </label>
          <input
            {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" } })}
            type="email"
            id="email"
            placeholder="Enter your email"
            autoComplete="email"
            className={`w-full border font-mono rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${errors.email ? "border-red-500" : ""}`}
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>
        <div>
          <label
            htmlFor="password"
            className="block font-mono text-gray-700 font-semibold mb-2"
          >
            Password:
          </label>
          <input
            {...register("password", { required: "Password is required", minLength: { value: 8, message: "Password must be at least 8 characters long" } })}
            type="password"
            id="password"
            placeholder="Enter your password"
            autoComplete="password"
            className={`w-full border font-mono rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${errors.password ? "border-red-500" : ""}`}
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>
        <button
          type="submit"
          className="w-full font-mono bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4"
        >
          Register
        </button>
      </form>
      <p className="mt-8 font-mono text-black">
        Already have an account?{" "}
        <Link
          to="/user/sign-in"
          className="text-blue-500 hover:text-blue-700 font-semibold"
        >
          Login!
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

export default SignupForm;
