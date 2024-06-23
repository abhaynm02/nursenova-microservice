import React from 'react';
import { Link } from 'react-router-dom';

const WorkWithUs = () => {
  return (
    <div className="relative w-full min-h-screen text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10 opacity-80"></div>
      <img
        className="absolute inset-0 w-full h-full object-cover object-center"
        src="/Nurse-applying-for-job.jpg"
        alt="Nurse applying-for-job"
      />
      <div className="relative z-20 container mx-auto px-4 h-screen flex flex-col justify-center items-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center">Work With Us</h1>
        <p className="text-lg md:text-xl mb-12 text-center">
          Join our team and make a difference in people's lives.
        </p>
        <Link to={'/nurse/register'}  className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-full font-semibold text-lg transition duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-gray-900">Apply Now </Link>
      </div>
    </div>
  );
};

export default WorkWithUs;