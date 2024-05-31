import React, { useState } from "react";
import loginImage from "../assets/nursehelp1.jpeg";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log({ email, password });
      // Perform the login logic here
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
    if (!password.trim()) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <div className="hidden sm:block">
        <img className="w-full h-full object-cover" src={loginImage} alt="" />
      </div>
      <div className="bg-gray-100 flex flex-col justify-center p-6 sm:p-10 lg:p-20">
        <form
          onSubmit={handleSubmit}
          className="max-w-[400px] w-full mx-auto bg-white p-8 rounded-2xl shadow-2xl"
        >
          <h2 className="text-4xl font-bold text-center py-6">Hi, Welcome 👋</h2>
          {Object.keys(errors).length > 0 && (
            <p className="text-red-600 font-bold mb-4">
              Please fill out the form correctly
            </p>
          )}
          <div className="flex flex-col py-3">
            <label className="font-semibold">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className={`border p-2 rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              type="email"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div className="flex flex-col py-3">
            <label className="font-semibold">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              className={`border p-2 rounded-md ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
              type="password"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
          <div className="flex justify-center">
            <button className="border font-bold text-white my-5 py-2 bg-green-400 hover:bg-green-500 w-40 rounded-xl">
              Sign In
            </button>
          </div>
          <div className="flex justify-center flex-wrap">
            <div className="m-2">
              <p className="underline font-bold">
                <Link to="/forgot-password">Forgot password?</Link>
              </p>
            </div>
            <div>
              <p>
                Don't have an account?{" "}
                <span className="underline font-bold">
                  <Link to="/sign-up">Create an account</Link>
                </span>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
