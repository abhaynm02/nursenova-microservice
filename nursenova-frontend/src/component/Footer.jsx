import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../assets/logo4.png';

const Footer = () => {
  return (
   <footer className="bg-gray-800 text-white py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <div className="flex flex-col items-center lg:items-start mb-4 lg:mb-0">
            <img src={logo} alt="Company Logo" className="h-12 mb-2" />
            <p className="text-center lg:text-left">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, pulvinar facilisis justo mollis.
            </p>
            <p className="text-center lg:text-left mt-2">&copy; 2024 Company Name. All rights reserved.</p>
          </div>
          <div className="flex flex-col items-center lg:items-end">
            <h3 className="text-xl font-bold mb-2">Contact Info</h3>
            <p>123 Street Name, City, State, 12345</p>
            <p>Email: info@company.com</p>
            <p>Phone: (123) 456-7890</p>
            <div className="mt-4 flex space-x-4">
              <Link to="#" className="text-blue-500 hover:text-blue-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557a9.837 9.837 0 01-2.828.775A4.935 4.935 0 0023.338 3.6a9.86 9.86 0 01-3.127 1.195 4.918 4.918 0 00-8.384 4.482A13.944 13.944 0 011.671 3.15a4.897 4.897 0 001.523 6.56 4.905 4.905 0 01-2.229-.616c-.054 2.28 1.581 4.415 3.949 4.889a4.935 4.935 0 01-2.224.084 4.92 4.92 0 004.6 3.417A9.867 9.867 0 010 21.539a13.942 13.942 0 007.548 2.213c9.057 0 14.01-7.513 14.01-14.013 0-.213-.005-.426-.014-.637A9.936 9.936 0 0024 4.557z" />
                </svg>
              </Link>
              <Link to="#" className="text-blue-500 hover:text-blue-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.225 0H1.771C.79 0 0 .79 0 1.771v20.453C0 23.21.79 24 1.771 24h20.453C23.21 24 24 23.21 24 22.225V1.771C24 .79 23.21 0 22.225 0zM7.216 20.452H3.548V9.033h3.668v11.419zM5.382 7.593a2.131 2.131 0 01-2.132-2.132 2.132 2.132 0 114.264 0c0 1.18-.951 2.132-2.132 2.132zm14.704 12.859h-3.666v-5.604c0-1.338-.026-3.065-1.865-3.065-1.868 0-2.154 1.46-2.154 2.965v5.704H8.737V9.033h3.516v1.561h.049c.49-.932 1.689-1.915 3.478-1.915 3.719 0 4.403 2.45 4.403 5.635v6.138z" />
                </svg>
              </Link>
              <Link to="#" className="text-blue-500 hover:text-blue-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 5.022 3.659 9.182 8.437 10.08v-7.112H5.898v-2.969h2.539V9.414c0-2.507 1.493-3.89 3.777-3.89 1.097 0 2.24.196 2.24.196v2.479h-1.26c-1.243 0-1.63.772-1.63 1.562v1.855h2.773l-.443 2.969h-2.33v7.112C20.341 21.182 24 17.022 24 12 24 5.373 18.627 0 12 0z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
