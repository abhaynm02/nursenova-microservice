import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { findBookings} from '../api/user';
import PageNavigationBar from './PageNavigationBar';

const UserBookings = () => {
    const userId = useSelector((state) => state.auth.email);
    const [services,setServices]=useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const navigate = useNavigate();
    useEffect(()=>{
        const fetchData=async(userId)=>{
          try {
            const response =await findBookings(userId,
              currentPage - 1,
              pageSize);
              console.log(response);
            setServices(response.data.content);
            setTotalPages(response.data.totalPages);
           
            console.log(response);
          } catch (error) {
          }
        }
        fetchData(userId);
    
      },[userId])
      const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
      };
  return (
    <div className="container mx-auto px-4 py-12 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
    <h1 className="text-4xl font-extrabold mb-8 text-center text-indigo-800 tracking-tight">
      Bookings
    </h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {services.map((service) => (
        <div key={service.id} className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-indigo-700">{service.serviceName}</h2>
              <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                {service.status}
              </span>
            </div>
     
            <div className="space-y-2 mb-6">
              <p className="text-gray-700"><span className="font-medium">Starting Date:</span> {new Date(service.startDate).toLocaleDateString()}</p>
              <p className="text-gray-700"><span className="font-medium">Ending Date :</span>{new Date(service.endDate).toLocaleDateString()}</p>
              <p className="text-gray-700"><span className="font-medium">Total Days:</span> {service.totalDays}</p>
              <p className="text-gray-700"><span className="font-medium">Total Price:</span> 
                <span className="text-green-600 font-bold ml-1">₹{service.totalPrice.toLocaleString()}</span>
              </p>
           
            </div>
            <button onClick={()=>{navigate(`/view/booking/${service.id}`)}} className="w-full bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:shadow-lg">
              View Details
            </button>
          </div>
        </div>
      ))}
  
    </div>
    <PageNavigationBar
      currentPage={currentPage}
      totalPages={totalPages}
      handlePageChange={handlePageChange}
    />
  </div>
  )
}

export default UserBookings
