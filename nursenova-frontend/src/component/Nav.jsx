import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const NavLinks = () => {
  
  
  return (
    <div className="flex flex-col items-center space-y-2 md:space-y-0 md:flex-row md:space-x-6">
      <NavLink
        to="/service"
        className={({ isActive }) => (isActive ? 'text-green-500' : 'text-gray-700')}
      >
        Service
      </NavLink>
      <NavLink
        to="/work-withus"
        className={({ isActive }) => (isActive ? 'text-green-500' : 'text-gray-700')}
      >
        Work with us
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) => (isActive ? 'text-green-500' : 'text-gray-700')}
      >
        About
      </NavLink>
      <NavLink
        to="/bookings"
        className={({ isActive }) => (isActive ? 'text-green-500' : 'text-gray-700')}
      >
        Bookings
      </NavLink>
      <NavLink
        to='/profile'
        className={({ isActive }) => (isActive ? 'text-green-500' : 'text-gray-700')}
      >
        Profile
      </NavLink>
    </div>
  );
};

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex items-center">
      <div className="hidden md:flex">
        <NavLinks />
      </div>
      <div className="md:hidden">
        <button onClick={toggleNavbar} className="text-gray-800 focus:outline-none">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center space-y-4 py-4 md:hidden">
          <NavLinks />
        </div>
      )}
    </nav>
  );
};

export default Nav;
