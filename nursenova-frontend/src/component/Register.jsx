import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {signup} from "../api/user";
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate=useNavigate();
  const name = useSelector((state) => state.auth.email);
  if(name){
    navigate(-1)
  }

  const handleSubmit = async (e) => {
    try{
      e.preventDefault();
      if (validate()) {
        console.log({ email, password, firstname, lastname, phone, confirmPassword });
        const data1 ={
          firstname:firstname,
          lastname:lastname,
          email:email,
          password:confirmPassword,
          phone:phone
        }
  
        const response = await signup(data1);
        if(response){
          toast.success(response.data.message)
          navigate('/otp',{ state: { userId: email}});
        }
  
  
      }
    }catch( error){
      console.log(error);
    }
   
  };


  const validate = () => {
    const newErrors = {};
    if (!firstname.trim()) newErrors.firstname = 'Firstname is required';
    if (!lastname.trim()) newErrors.lastname = 'Lastname is required';
    if (!phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/.test(phone)) newErrors.phone = 'Phone number is invalid';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
    if (!password.trim()) newErrors.password = 'Password is required';
    if (!confirmPassword.trim()) newErrors.confirmPassword = 'Confirm Password is required';
    else if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="mx-auto flex justify-center items-center sm:grid-cols-2 min-h-screen w-full bg-center bg-cover relative">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{backgroundImage:"url('/nurse_helping_in_home-2000x660-1.jpg')", opacity: 0.5}}
      ></div>
      <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-20 z-10">
  <form onSubmit={handleSubmit} className="max-w-[700px] w-full mx-auto bg-white p-12 rounded-2xl shadow-2xl">
    <h2 className="text-4xl font-bold text-center py-6">Create Account</h2>
    <p className="text-center text-gray-600 mb-8">Please enter your details below</p>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="flex flex-col">
        <label className="font-semibold mb-2">Firstname</label>
        <input
          onChange={(e) =>{ setFirstname(e.target.value); validate() }}
          className={`border p-3 rounded-md ${errors.firstname ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-400`}
          type="text"
          placeholder="John"
        />
        {errors.firstname && <p className="text-red-500 text-sm mt-1">{errors.firstname}</p>}
      </div>
      
      <div className="flex flex-col">
        <label className="font-semibold mb-2">Lastname</label>
        <input
          onChange={(e) =>{ setLastname(e.target.value);validate()}}
          className={`border p-3 rounded-md ${errors.lastname ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-400`}
          type="text"
          placeholder="Doe"
        />
        {errors.lastname && <p className="text-red-500 text-sm mt-1">{errors.lastname}</p>}
      </div>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <div className="flex flex-col">
        <label className="font-semibold mb-2">Phone</label>
        <input
          onChange={(e) =>{ setPhone(e.target.value);validate()}}
          className={`border p-3 rounded-md ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-400`}
          type="text"
          placeholder="1234567890"
        />
        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
      </div>
      
      <div className="flex flex-col">
        <label className="font-semibold mb-2">Email</label>
        <input
          onChange={(e) =>{ setEmail(e.target.value);validate()}}
          className={`border p-3 rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-400`}
          type="email"
          placeholder="john@example.com"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <div className="flex flex-col">
        <label className="font-semibold mb-2">Password</label>
        <input
          onChange={(e) =>{ setPassword(e.target.value);validate()}}
          className={`border p-3 rounded-md ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-400`}
          type="password"
          placeholder="Enter your password"
        />
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
      </div>
      
      <div className="flex flex-col">
        <label className="font-semibold mb-2">Confirm Password</label>
        <input
          onChange={(e) => {setConfirmPassword(e.target.value);validate()}}
          className={`border p-3 rounded-md ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-400`}
          type="password"
          placeholder="Re-enter your password"
        />
        {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
      </div>
    </div>
    
    <div className="flex justify-center mt-10">
      <button 
        type="submit"
        className="border font-bold text-white py-3 px-8 bg-green-500 hover:bg-green-600 rounded-xl transition duration-300 text-lg shadow-md"
      >
        Create Account
      </button>
    </div>
    
    <div className="flex justify-center mt-6">
      <p className="text-gray-600">
        Already have an account?{' '}
        <span className="text-blue-500 hover:text-blue-700 font-semibold cursor-pointer">
          <Link to="/login">Login here</Link>
        </span>
      </p>
    </div>
  </form>
</div>
    </div>
  );
};

export default Register;