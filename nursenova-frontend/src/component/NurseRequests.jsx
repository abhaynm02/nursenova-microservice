import React, { useEffect, useState } from 'react'
import { nurseverificationRequests } from '../api/admin';
import { useNavigate } from 'react-router-dom';
import PageNavigationBar from './PageNavigationBar';

const NurseRequests = () => {
const [requests,setRequests]=useState([]);
const [currentPage, setCurrentPage] = useState(1);
const [totalPages, setTotalPages] = useState(0);
const [pageSize, setPageSize] = useState(10);
const navigate=useNavigate();

useEffect(()=>{
   const fetchData=async()=>{
   const response=await nurseverificationRequests(currentPage - 1, pageSize);
   setRequests(response.data.content);
   setTotalPages(response.data.totalPages);
   }
   fetchData();
},[currentPage, pageSize])

const handlePageChange = (newPage) => {
  setCurrentPage(newPage);
};

const viewRequest =(username)=>{
    navigate(`/admin/nurse/request/view/${username}`)
    console.log(username)
}


  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-center font-bold text-3xl md:text-4xl mb-8">Requests</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-3 text-left text-sm font-semibold tracking-wide">Id</th>
              <th className="p-3 text-left text-sm font-semibold tracking-wide">Name</th>
              <th className="p-3 text-left text-sm font-semibold tracking-wide">Username</th>
              <th className="p-3 text-left text-sm font-semibold tracking-wide">gender</th>
              <th className="p-3 text-left text-sm font-semibold tracking-wide">phone</th>
              <th className="p-3 text-center text-sm font-semibold tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr
                key={request.id}
              >
                <td className="p-3">{request.id}</td>
                <td className="p-3">{`${request.firstName} ${request.lastName}`}</td>
                <td className="p-3">{request.userName}</td>
                 <td className="p-3">{request.phone}</td>
                  <td className="p-3">{request.gender}</td>
                <td className="p-3">
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => viewRequest(request.id)}
                      className={'bg-green-500 px-3 py-2 rounded-md '}
                    >
                      View
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        {/* pagination code  */}
        <PageNavigationBar currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange}/>
    </div>
  )
}

export default NurseRequests
