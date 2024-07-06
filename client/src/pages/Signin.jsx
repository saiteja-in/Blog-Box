import React, { useState } from "react";
import blog from "../photos/blogs.png";
import { Button, Spinner } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import {signInStart,signInSuccess,signInFailure} from "../redux/user/userSlice"
import { useDispatch,useSelector } from "react-redux";
import OAuth from "../components/OAuth";
const Signin = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const [formData, setFormData] = useState({});
  const{loading}=useSelector((state)=>state.user);
  // const [errorMessage, setErrorMessage] = useState(null);
  // const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      // setErrorMessage("All fields are required");
      dispatch(signInFailure("All fields are required"));
      toast.error("All fields are required");
      return;
    }
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
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
        }, 500);
      }
      // if (!data.success) {
      //   dispatch(signInFailure(data.message));
      // }
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
          <div className="flex items-center justify-center px-4 py-10 bg-white sm:px-6 lg:px-8 sm:py-16 lg:py-24">
            <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto py-10">
              <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
                Sign in
              </h2>
              <p className="mt-2 text-base text-gray-600">
                Don’t have an account?{" "}
                <a
                  href="/sign-up"
                  title=""
                  className="font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 hover:underline focus:text-blue-700"
                >
                  Create a free account
                </a>
              </p>

              <form className="mt-8" onSubmit={handleSubmit}>
                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="email"
                      className="text-base font-medium text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2.5">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        onChange={handleChange}
                        placeholder="Enter email to get started"
                        className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="text-base font-medium text-gray-900"
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
                        onChange={handleChange}
                        placeholder="Enter your password"
                        className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                      />
                    </div>
                  </div>

                  <div>
                    <Button
                      gradientDuoTone="purpleToPink"
                      className="w-full py-2"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? <Spinner size="sm" color="white" /> : "Log in"}
                    </Button>
                  </div>
                </div>
                <OAuth/>
                {/* <div>{errorMessage && <p className="text-red-500">{errorMessage}</p>}</div> */}
              </form>

              {/* <div className="mt-3 space-y-3">
                <button
                  type="button"
                  className="relative inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-gray-700 transition-all duration-200 bg-white border-2 border-gray-200 rounded-md hover:bg-gray-100 focus:bg-gray-100 hover:text-black focus:text-black focus:outline-none"
                >
                  <div className="absolute inset-y-0 left-0 p-4">
                    <svg
                      className="w-6 h-6 text-rose-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                    </svg>
                  </div>
                  Sign in with Google
                </button>
              </div> */}
            </div>
          </div>

          <div className="flex items-center justify-center px-4 py-10 sm:py-16 lg:py-24 bg-gray-50 sm:px-6 lg:px-8">
            <div>
              <img
                className="w-full mx-auto"
                src={blog}
                alt=""
                style={{ maxWidth: "400px" }} // Set maximum width to 300px
              />

              <div className="w-full max-w-md mx-auto xl:max-w-xl">
                <h3 className="text-2xl font-bold text-center text-black">
                  Write your own blog
                </h3>
                <p className="leading-relaxed text-center text-gray-500 mt-2.5">
                  hasta la vista
                </p>
              </div>
            </div>
          </div>
        </div>
      {/* </section> */}
    </div>
  );
};

export default Signin;

