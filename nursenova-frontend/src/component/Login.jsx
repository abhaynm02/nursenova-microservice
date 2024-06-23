import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/user";
import { useDispatch } from "react-redux";
import { setRole, setToken,setEmail } from "../redux/AuthSlice";
import { toast } from "react-toastify";



const Login = () => {
  const [email, setEmaill] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const[role,setRoleN]=useState("");
  const navigate =useNavigate();
  const dispatch = useDispatch();


  const handleSubmit = async(e) => {
    e.preventDefault();
    if (validate()) {
      console.log({ email, password });

      const data ={
        email:email,
        password:password
      }
      const response =await login(data);

      if(response){
        console.log(response.data)
        setRoleN(response.data.role);
        
        dispatch(setEmail(response.data.username));
        dispatch(setRole(response.data.role));
        dispatch(setToken(response.data.token))
        console.log(response.data.role)
        if (role === "ADMIN") {
          toast.success("Logged in as admin");
          navigate("/admin/dashboard");
        }
       
        if (role === "USER") {
          toast.success("Logged in as user");
          navigate("/");
        } 
        if(role =="NURSE"){
          toast.success("Logged in as nurse")
          navigate("/nurse/home")
        }
        

      }
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
    <div className="mx-auto flex justify-center items-center min-h-screen w-full bg-center bg-cover relative">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/nurse_helping_in_home-2000x660-1.jpg')", opacity: 0.7 }}
      ></div>
      <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-20 z-10">
  <form
    onSubmit={handleSubmit}
    className="max-w-[500px] w-full mx-auto bg-white p-10 rounded-2xl shadow-2xl"
  >
    <h2 className="text-4xl font-bold text-center py-6">Welcome Back 👋</h2>
    <p className="text-center text-gray-600 mb-8">Please sign in to continue</p>

    {Object.keys(errors).length > 0 && (
      <div className="mb-6">
        <p className="text-red-600 font-semibold text-center p-3 bg-red-50 border border-red-200 rounded-md">
          Please fill out the form correctly
        </p>
      </div>
    )}

    <div className="space-y-6">
      <div className="flex flex-col">
        <label htmlFor="email" className="font-semibold mb-2">Email</label>
        <input
          id="email"
          onChange={(e) =>{ setEmaill(e.target.value);validate()}}
          className={`border p-3 rounded-md ${
            errors.email ? "border-red-500" : "border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-green-400`}
          type="email"
          placeholder="john@example.com"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>

      <div className="flex flex-col">
        <label htmlFor="password" className="font-semibold mb-2">Password</label>
        <input
          id="password"
          onChange={(e) => {setPassword(e.target.value),validate()}}
          className={`border p-3 rounded-md ${
            errors.password ? "border-red-500" : "border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-green-400`}
          type="password"
          placeholder="Enter your password"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password}</p>
        )}
      </div>
    </div>

    <div className="flex justify-end mt-2">
      <Link
        to="/forgot-password"
        className="text-blue-500 hover:text-blue-700 text-sm font-semibold transition-colors duration-300"
      >
        Forgot password?
      </Link>
    </div>

    <div className="flex justify-center mt-10">
      <button
        type="submit"
        className="w-full sm:w-auto font-bold text-white py-3 px-12 bg-green-500 hover:bg-green-600 rounded-xl transition duration-300 text-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
      >
        Sign In
      </button>
    </div>

    <div className="flex justify-center mt-8">
      <p className="text-gray-600 text-center">
        Don't have an account?{" "}
        <span className="text-blue-500 hover:text-blue-700 font-semibold cursor-pointer transition-colors duration-300">
          <Link to="/sign-up">Create an account</Link>
        </span>
      </p>
    </div>
  </form>
</div>
    </div>
  );
};

export default Login;