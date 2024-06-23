import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LogOut, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logOut } from '../redux/AuthSlice';

const NavLinkss = () => {
  return (
    <div className="flex flex-col items-center space-y-2 md:space-y-0 md:flex-row md:space-x-6">
      <NavLink
        to="/admin/services"
        className={({ isActive }) => (isActive ? 'text-green-500' : 'text-gray-700 hover:text-gray-900')}
      >
        Services
      </NavLink>
      <NavLink
        to="/admin/nurse/requests"
        className={({ isActive }) => (isActive ? 'text-green-500' : 'text-gray-700 hover:text-gray-900')}
      >
        Requests
      </NavLink>
      <NavLink
        to="/admin/users"
        className={({ isActive }) => (isActive ? 'text-green-500' : 'text-gray-700 hover:text-gray-900')}
      >
        Users
      </NavLink>
      <NavLink
        to="/admin/staffs"
        className={({ isActive }) => (isActive ? 'text-green-500' : 'text-gray-700 hover:text-gray-900')}
      >
        Staffs
      </NavLink>
    </div>
  );
};

const AdminNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch=useDispatch();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
   
   dispatch(logOut())
    console.log("Logging out...");
    navigate('/login'); 
  };

  return (
    <nav className="flex items-center justify-between w-full">
      <div className="hidden md:flex items-center space-x-6">
        <NavLinkss />
      </div>

      <div className="md:hidden">
        <button onClick={toggleNavbar} className="text-gray-800 focus:outline-none">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <button
        onClick={handleLogout}
        className="hidden md:flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 shadow-md"
      >
        <LogOut className="w-5 h-5" />
        <span className="font-medium">Logout</span>
      </button>

      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center space-y-4 py-6 md:hidden">
          <NavLinkss /> 
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 shadow-md mt-4"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      )}
    </nav>
  );
};

export default AdminNav;