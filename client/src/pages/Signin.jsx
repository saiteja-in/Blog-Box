import React, { useState } from "react";
import blog from "../photos/blogs.png";
import { Button, Spinner } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";
import { useForm } from "react-hook-form";
import light1 from "../../public/1.json";
import dark1 from "../../public/10.json";
import Lottie from "lottie-react";
import { SparklesText } from "../components/UI/text1";

const Signin = () => {
  const { theme } = useSelector((state) => state.theme);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data1) => {
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        body: JSON.stringify(data1),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.message === "User logged in successfully") {
        dispatch(signInSuccess(data.user));
        toast.success("Logged in successfully");
        toast.success("Redirecting to Home Page.", {
          style: {
            border: "1px solid #713200",
            padding: "16px",
            color: "#713200",
          },
          iconTheme: {
            primary: "#713200",
            secondary: "#FFFAEE",
          },
        });
        setTimeout(() => {
          navigate("/");
        }, 300);
      }
      if (data.success === false && data.message === "Invalid credentials") {
        dispatch(signInFailure(data.message));
        toast.error("Invalid credentials");
      }
      if (data.success === false && data.message === "User not found") {
        dispatch(signInFailure(data.message));
        toast.error("User not found");
      }
    } catch (error) {
      toast.error("Server error");
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      {/* <section className="bg-white "> */}
      <div className=" grid grid-cols-1 lg:grid-cols-2 ">
        <div className="flex items-center justify-center px-4 py-10  sm:px-6 lg:px-8 sm:py-16 lg:py-24">
          <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto py-10">
            <h2 className="text-3xl font-bold leading-tight  sm:text-4xl">
              Sign in
            </h2>
            <p className="mt-2 text-base ">
              Don’t have an account?{" "}
              <a
                href="/sign-up"
                title=""
                className="font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 hover:underline focus:text-blue-700"
              >
                Create a free account
              </a>
            </p>

            <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="text-base font-medium "
                  >
                    Email address
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        validate: (value) =>
                          value.includes("@") && value.includes("."),
                      })}
                      placeholder="Enter email to get started"
                      className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md  focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                    />
                    {errors.email && (
                      <div className="text-red-500">{errors.email.message}</div>
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-base font-medium "
                    >
                      Password
                    </label>

                    <a
                      href="#"
                      title=""
                      className="text-sm font-medium text-blue-600 hover:underline hover:text-blue-700 focus:text-blue-700"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <div className="mt-2.5">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 8,
                          message: "Password must have at least 8 characters",
                        },
                      })}
                      placeholder="Enter your password"
                      className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md  focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                    />
                    {errors.password && (
                      <div className="text-red-500">
                        {errors.password.message}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <Button
                    gradientDuoTone="purpleToPink"
                    className="w-full py-2"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <Spinner size="sm" color="white" />
                    ) : (
                      "Log in"
                    )}
                  </Button>
                </div>
              </div>
              <OAuth />
            </form>
          </div>
        </div>

        <div className="flex flex-col gap-3 items-center justify-center">
  <div className="lg:w-3/4 relative animate-float -mt-4"> {/* Moved Lottie slightly upwards by adding negative margin */}
    <Lottie
      animationData={theme === "dark" ? dark1 : light1}
      loop={true}
      className="w-full h-auto max-w-2xl mx-auto"
      style={{ maxWidth: "800px", width: "100%" }}
    />
  </div>

  <div className="w-full max-w-md mx-auto text-center xl:max-w-xl">
    <SparklesText text="Blog outside the box" className="text-xl md:text-2xl" /> {/* Reduced font size */}
  </div>
</div>


      </div>
    </div>
  );
};

export default Signin;
