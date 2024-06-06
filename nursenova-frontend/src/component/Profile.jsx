import { LogOut } from 'lucide-react'
import React from 'react'
import { logOut } from '../redux/AuthSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';


const Profile = () => {
    const navigate = useNavigate();
  const dispatch=useDispatch();
    const handleLogout = () => {
   
        dispatch(logOut())
         console.log("Logging out...");
         navigate('/login'); 
       };
  return (
    <div className='flex flex-col justify-center items-center mb-96 '>
         <button
        onClick={handleLogout}
        className=" md:flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 shadow-md"
      >
        <LogOut className="w-5 h-5" />
        <span className="font-medium">Logout</span>
      </button>
      
    </div>
  )
}

export default Profile
