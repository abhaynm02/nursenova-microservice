import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Calendar, Clock, Phone } from 'react-feather';

const PaymentSuccessPage = () => {
  return (
    <div className="pt-16 w-full min-h-screen text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-green-900 to-blue-900 z-10 opacity-80"></div>
      
      <img
        className="absolute inset-0 w-full h-full object-cover object-center"
        src="/nurse_helping_in_home-2000x660-1.jpg"
        alt="Successful payment background"
      />
      
      <div className="relative z-20 container mx-auto px-4 min-h-screen flex flex-col justify-center items-center py-12 sm:py-16">
        <CheckCircle className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-green-400 mb-6 sm:mb-8 animate-bounce" />
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-6 text-center text-shadow">
          Payment Successful!
        </h1>
        
        <p className="text-base sm:text-lg md:text-xl text-gray-100 mb-6 sm:mb-8 max-w-xl md:max-w-2xl text-center text-shadow-sm px-4">
          Thank you for booking with us. Your nurse is on the way to provide expert care tailored to your needs.
        </p>
        
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-8 sm:mb-12 w-full sm:w-auto px-4">
          <Link
            to="/bookings"
            className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-full font-semibold text-lg transition duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-green-900 inline-block text-center w-full sm:w-auto"
          >
            View Booking
          </Link>
          <Link
            to="/"
            className="bg-transparent hover:bg-white text-white hover:text-gray-900 py-3 px-6 rounded-full font-semibold text-lg transition duration-300 border-2 border-white hover:border-transparent focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-900 inline-block text-center w-full sm:w-auto"
          >
            Return Home
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 text-center px-4 w-full max-w-4xl">
          <div className="bg-white bg-opacity-10 p-4 sm:p-6 rounded-lg backdrop-blur-sm">
            <Calendar className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-3 sm:mb-4 text-green-400" />
            <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Booking Confirmed</h3>
            <p className="text-sm sm:text-base text-gray-200">Your appointment is set and ready</p>
          </div>
          <div className="bg-white bg-opacity-10 p-4 sm:p-6 rounded-lg backdrop-blur-sm">
            <Clock className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-3 sm:mb-4 text-green-400" />
            <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">24/7 Support</h3>
            <p className="text-sm sm:text-base text-gray-200">We're here for you around the clock</p>
          </div>
          <div className="bg-white bg-opacity-10 p-4 sm:p-6 rounded-lg backdrop-blur-sm">
            <Phone className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-3 sm:mb-4 text-green-400" />
            <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Stay Connected</h3>
            <p className="text-sm sm:text-base text-gray-200">We'll contact you with further details</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;