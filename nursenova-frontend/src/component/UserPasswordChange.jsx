import { configureStore } from '@reduxjs/toolkit';
import { data } from 'autoprefixer';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { changePassword } from '../api/user';
import { toast } from 'react-toastify';

const UserPasswordChange = () => {
    const[password,setPassword]=useState('')
    const[confirmPassword,setConfirmPassword]=useState('');
    const[oldPassword,setOldPassword]=useState('');
    const[errors,setErrors]=useState({});
    const username = useSelector((state) => state.auth.email);
     
    const validate=()=>{
        const newErrors={};
        if (!oldPassword.trim()) newErrors.oldPassword = 'oldPassword is required';
        if (!password.trim()) newErrors.password = 'Password is required';
        if (!confirmPassword.trim()) newErrors.confirmPassword = 'Confirm Password is required';
        else if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(validate()){
     const data={
      username:username,
      password:password,
      oldPassword:oldPassword,
          }
          try {
            const response =await changePassword(data);
            toast.success("password updated successfully");
            setPassword('');
            setConfirmPassword('');
            setOldPassword('');

            
          } catch (error) {
            
          }
        }
        console.log(password,confirmPassword)

    }
  return (
    <div className="max-w-md mx-auto mt-10 bg-gray-300 rounded-xl shadow-md overflow-hidden md:max-w-2xl px-4 md:px-0 ">
    <div className="p-8 ">
      <h2 className="uppercase tracking-wide text-lg text-indigo-500 font-semibold mb-4">Change Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="mt-4">
          <label htmlFor="oldPassword" className='text-slate-500 font-bold block mb-1'>oldPassword:</label>
          <input 
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder='oldPassword'
            className='w-full bg-slate-100 focus:outline-none focus:ring-2 focus:ring-green-400 rounded p-2'
           
          />
          {errors.oldPassword && <p className="text-red-500 text-sm mt-1">{errors.oldPassword}</p>}
        </div>
        <div className="mt-4">
          <label htmlFor="password" className='text-slate-500 font-bold block mb-1'>password:</label>
          <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            className='w-full bg-slate-100 focus:outline-none focus:ring-2 focus:ring-green-400 rounded p-2'
           
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>
        <div className="mt-4">
          <label htmlFor="confirmPassword" className='text-slate-500 font-bold block mb-1'>confirmPassword:</label>
          <input 
            type="password"
            value={confirmPassword}
            onChange={(e)=>setConfirmPassword(e.target.value)}
            placeholder='confirmPassword'
            className='w-full bg-slate-100 focus:outline-none focus:ring-2 focus:ring-green-400 rounded p-2'
            
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
        </div>
    
        <div className="flex justify-end mt-6">
         
            <button
              type="submit"
              className="px-4 py-2 rounded-md font-bold transition duration-300 bg-green-500 text-white hover:bg-green-600"
            >
              Edit
            </button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default UserPasswordChange
