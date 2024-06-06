import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword } from "../api/user";
import {  toast } from "react-toastify";
import { useSelector } from "react-redux";


const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const name = useSelector((state) => state.auth.email);
  if(name){
    navigate(-1);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
        const data={
            email:email
        }
        console.log("inside forgotpassword")
       const response = await forgotPassword(data);
       if(response){
        toast.success(response);
        navigate('/otp',{ state: { userId: email,name:"forgot"}})

       }
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-center bg-cover relative">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('/nurse_helping_in_home-2000x660-1.jpg')",
          opacity: 0.7,
        }}
      ></div>
      <div className="flex flex-col justify-center p-4 sm:p-6 lg:p-10 z-10 w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="w-full bg-white p-6 sm:p-10 rounded-2xl shadow-2xl"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center py-4 sm:py-6 text-green-700">
            No Worries, We've Got You
          </h2>
          <p className="text-center text-gray-600 mb-6 sm:mb-8">
            Enter your email to reset your password
          </p>

          {errors.submit && (
            <div className="mb-6">
              <p className="text-red-600 font-semibold text-center p-3 bg-red-50 border border-red-200 rounded-md">
                {errors.submit}
              </p>
            </div>
          )}

          {Object.keys(errors).length > 0 && !errors.submit && (
            <div className="mb-6">
              <p className="text-red-600 font-semibold text-center p-3 bg-red-50 border border-red-200 rounded-md">
                Please fill out the form correctly
              </p>
            </div>
          )}

          <div className="space-y-6">
            <div className="flex flex-col">
              <label htmlFor="email" className="font-semibold mb-2">
                Email
              </label>
              <input
                id="email"
                value={email}
                onChange={(e) => {setEmail(e.target.value);validate()}}
                className={`border p-3 rounded-md ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-green-400`}
                type="email"
                placeholder="john@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="flex justify-center mt-8 sm:mt-10">
            <button
              type="submit"
              className="w-full sm:w-auto font-bold text-white py-3 px-8 sm:px-12 bg-green-500 hover:bg-green-600 rounded-xl transition duration-300 text-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
            >
              Reset Password
            </button>
          </div>

          <div className="mt-6 text-center text-sm text-gray-600">
            <span>Remember your password? </span>
            <Link to="/login" className="text-green-500 hover:underline font-medium">
              Log In
            </Link>
          </div>
        </form>

        <div className="mt-4 text-center text-sm text-white">
          <span>Don't have an account? </span>
          <Link to="/sign-up" className="text-green-200 hover:underline font-medium">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;