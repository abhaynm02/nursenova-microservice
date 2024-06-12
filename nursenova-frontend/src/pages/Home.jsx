import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const name = useSelector((state) => state.auth.email);
  const role =useSelector((state)=>state.auth.role);
  const navigate =useNavigate();

  // useEffect(() => {
  //   if(role ==="ADMIN"){

  //     navigate('/admin')
  //   }
  //   toast.success(name);
  // }, [name]);

  return (
    <div className="pt-16 w-full min-h-screen text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10 opacity-80"></div>

      <img
        className="absolute inset-0 w-full h-full object-cover object-center"
        src="/nurse_helping_in_home-2000x660-1.jpg"
        alt="Nurse helping patient at home"
      />

      <div className="relative z-20 container mx-auto px-4 h-screen flex flex-col justify-center items-start">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-shadow">
          Hire Skilled and Private Nurses
        </h1>

        <p className="text-lg md:text-xl text-gray-100 mb-8 max-w-2xl text-shadow-sm">
          Whether you need a private nurse for convenient care at home, or reliable nursing staff for shift scheduling, we are available 24/7 to support your needs.
        </p>

        <div className="space-x-4">
          <button className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-full font-semibold text-lg transition duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-gray-900">
            Hire Now
          </button>
          <button className="bg-transparent hover:bg-white text-white hover:text-gray-900 py-3 px-6 rounded-full font-semibold text-lg transition duration-300 border-2 border-white hover:border-transparent focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900">
            Learn More
          </button>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-2">24/7 Availability</h3>
            <p className="text-gray-200">Round-the-clock care when you need it most</p>
          </div>
          <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-2">Expert Care</h3>
            <p className="text-gray-200">Highly skilled and compassionate nurses</p>
          </div>
          <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-2">Personalized Service</h3>
            <p className="text-gray-200">Tailored to your unique health needs</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
