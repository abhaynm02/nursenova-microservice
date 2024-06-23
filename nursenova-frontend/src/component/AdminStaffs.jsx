import React, { useEffect, useState } from 'react'
import { findAllStaffs,blockNurse } from '../api/admin';
import { useNavigate } from 'react-router-dom';
import PageNavigationBar from './PageNavigationBar';
import { Search } from 'lucide-react';

const AdminStaffs = () => {
    const [nurses,setNurse]=useState([]);
    const [datafech,setDataFetch]=useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const[searchKey,SetSearchKey]=useState('');
    const navigate=useNavigate();
    useEffect(() => {
      const fetchData = async () => {
        const response = await findAllStaffs(currentPage - 1, pageSize,searchKey);
        console.log(response)
        setNurse(response.data.content);
        setTotalPages(response.data.totalPages);
      };
      fetchData();
    }, [currentPage, pageSize,searchKey, datafech]);

    const handlePageChange = (newPage) => {
      setCurrentPage(newPage);
    };
    
    const BlockNurse =async(nurseId,status)=>{
      const data ={
        nurseId:nurseId,
        status:!status
      }
      const response =await blockNurse(data);
      setDataFetch(!datafech)

    }
    const viewDetails =(userId)=>{
          navigate(`/admin/staff/view/${userId}`)
    }
    const search=(e)=>{
      SetSearchKey(e.target.value);
    }

  return (
    <div className="container mx-auto px-4 py-8">
    <div className="flex justify-between items-center mb-8">
        <h1 className="font-bold text-3xl md:text-4xl">Staffs</h1>
        <div className="relative w-64">
          <input
            type="text"
            className="uppercase w-full border bg-gray-100 rounded-md px-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
            placeholder="Search..."
            value={searchKey}
            onChange={search}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
        </div>
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="p-3 text-left text-sm font-semibold tracking-wide">Id</th>
            <th className="p-3 text-left text-sm font-semibold tracking-wide">UserName</th>
            <th className="p-3 text-left text-sm font-semibold tracking-wide">Name</th>
            <th className="p-3 text-center text-sm font-semibold tracking-wide">Actions</th>
          </tr>
        </thead>
        <tbody>
          {nurses.map((nurse) => (
            <tr
              key={nurse.id}
              className={`border-b ${nurse.verified ? '' : 'bg-red-100'} hover:bg-gray-100 transition duration-300`}
            >
              <td className="p-3">{nurse.id}</td>
              <td className="p-3">{nurse.userName}</td>
              <td className="p-3">{`${nurse.firstName} ${nurse.lastName}`}</td>
              <td className="p-3">
                <div className="flex justify-center space-x-2">
                  <button
                    onClick={() => viewDetails(nurse.id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md shadow-md transition duration-300"
                  >
                   View
                  </button>
                  <button
                    onClick={() => BlockNurse(nurse.id, nurse.verified)}
                    className={`${
                      nurse.verified
                        ? 'bg-green-500 hover:bg-green-600'
                        : 'bg-red-500 hover:bg-red-600'
                    } text-white px-3 py-2 rounded-md shadow-md transition duration-300`}
                  >
                    {nurse.verified ? 'Block' : 'Unblock'}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <PageNavigationBar currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange}>

    </PageNavigationBar>
    </div>
  )
}

export default AdminStaffs
