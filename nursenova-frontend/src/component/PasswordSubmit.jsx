import React, { useState,useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { updatePassword } from "../api/user";


const PasswordSubmit = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location =useLocation();

  useEffect(() => {
    if (location.state && location.state.userId) {
      setEmail(location.state.userId);
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
        const data={
            email:email,
            password:confirmPassword
        }
       const response =updatePassword(data);
       if(response){
        navigate('/login')
       }
      
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!newPassword) newErrors.newPassword = "New password is required";
    else if (newPassword.length < 8) newErrors.newPassword = "Password must be at least 8 characters";
    
    if (!confirmPassword) newErrors.confirmPassword = "Please confirm your password";
    else if (newPassword !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";

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
            Set Your New Password
          </h2>
          <p className="text-center text-gray-600 mb-6 sm:mb-8">
            Choose a strong, unique password for your account
          </p>

          {errors.submit && (
            <div className="mb-6">
              <p className="text-red-600 font-semibold text-center p-3 bg-red-50 border border-red-200 rounded-md">
                {errors.submit}
              </p>
            </div>
          )}

          <div className="space-y-6">
            <div className="flex flex-col">
              <label htmlFor="newPassword" className="font-semibold mb-2">
                New Password
              </label>
              <input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => {setNewPassword(e.target.value),validate()}}
                className={`border p-3 rounded-md ${
                  errors.newPassword ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-green-400`}
                placeholder="••••••••"
              />
              {errors.newPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="confirmPassword" className="font-semibold mb-2">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => {setConfirmPassword(e.target.value),validate()}}
                className={`border p-3 rounded-md ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-green-400`}
                placeholder="••••••••"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <button
              type="submit"
              className="w-full font-bold text-white py-3 px-8 sm:px-12 bg-green-500 hover:bg-green-600 rounded-xl transition duration-300 text-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
            >
              Set New Password
            </button>
           
          </div>
        </form>

        <div className="mt-4 text-center text-sm text-white">
          <span>Back to </span>
          <Link to="/login" className="text-green-200 hover:underline font-medium">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PasswordSubmit;