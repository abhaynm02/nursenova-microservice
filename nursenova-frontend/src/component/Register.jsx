import React, { useState } from 'react';
import loginImage from '../assets/nursehelp1.jpeg';
import { Link } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log({ email, password, firstname, lastname, phone, confirmPassword });
      // Perform the registration logic here
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
    <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <div className="hidden sm:block">
        <img className="w-full h-full object-cover" src={loginImage} alt="" />
      </div>
      <div className="bg-gray-100 flex flex-col justify-center p-6 sm:p-10 lg:p-20">
        <form onSubmit={handleSubmit} className="max-w-[400px] w-full mx-auto bg-white p-8 rounded-2xl shadow-2xl">
          <h2 className="text-3xl font-bold text-center py-4">Create Account</h2>
          <p className="text-center text-gray-600 mb-4">Please enter your details below</p>
          <div className="flex flex-col mt-1">
            <label className="font-semibold">Firstname</label>
            <input
              onChange={(e) => setFirstname(e.target.value)}
              className={`border p-2 rounded-md ${errors.firstname ? 'border-red-500' : 'border-gray-300'}`}
              type="text"
            />
            {errors.firstname && <p className="text-red-500 text-sm">{errors.firstname}</p>}
          </div>
          <div className="flex flex-col mt-3">
            <label className="font-semibold">Lastname</label>
            <input
              onChange={(e) => setLastname(e.target.value)}
              className={`border p-2 rounded-md ${errors.lastname ? 'border-red-500' : 'border-gray-300'}`}
              type="text"
            />
            {errors.lastname && <p className="text-red-500 text-sm">{errors.lastname}</p>}
          </div>
          <div className="flex flex-col mt-3">
            <label className="font-semibold">Phone</label>
            <input
              onChange={(e) => setPhone(e.target.value)}
              className={`border p-2 rounded-md ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
              type="text"
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>
          <div className="flex flex-col mt-3">
            <label className="font-semibold">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className={`border p-2 rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              type="email"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div className="flex flex-col mt-3">
            <label className="font-semibold">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              className={`border p-2 rounded-md ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
              type="password"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
          <div className="flex flex-col mt-3">
            <label className="font-semibold">Confirm Password</label>
            <input
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`border p-2 rounded-md ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
              type="password"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
          </div>
          <div className="flex justify-center">
            <button className="border font-bold text-white my-5 py-2 bg-green-400 hover:bg-green-500 w-40 rounded-xl">
              Sign Up
            </button>
          </div>
          <div className="flex justify-center flex-wrap">
            <div>
              <p>
                Already have an account ?{' '}
                <span className="underline font-bold">
                  <Link to="/login">Login</Link>
                </span>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
