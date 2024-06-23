import React, { useEffect, useState } from 'react'
import { blockOrUnblockUser, findAllUsers } from '../api/admin'
import { toast } from 'react-toastify'
import PageNavigationBar from './PageNavigationBar'
import { Search } from 'lucide-react'

const AdminUsers = () => {
  const [users, setUsers] = useState([])
  const [dataFetch, setDataFetch] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const[searchKey,setSearchKey]=useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await findAllUsers(currentPage - 1, pageSize,searchKey)
        setUsers(response.data.content)
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.log('Error fetching users:', error)
      }
    }
    fetchUsers()
  }, [currentPage, pageSize,searchKey,dataFetch])
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const blockUser = async (id, status) => {
    try {
      const data = {
        id: id,
        status: !status,
      }
      const response = await blockOrUnblockUser(data)
      setDataFetch(!dataFetch)
      toast.success(
        status ? 'user blocked successfully' : 'user unblocked successfully'
      )
    } catch (error) {
      console.log(error)
    }
  }
  const search =(e)=>{
    setSearchKey(e.target.value);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-bold text-3xl md:text-4xl">Users</h1>
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
              <th className="p-3 text-left text-sm font-semibold tracking-wide">Name</th>
              <th className="p-3 text-left text-sm font-semibold tracking-wide">Username</th>
              <th className="p-3 text-center text-sm font-semibold tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className={`border-b ${user.status ? '' : 'bg-red-100'} hover:bg-gray-100 transition duration-300`}
              >
                <td className="p-3">{user.id}</td>
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.username}</td>
                <td className="p-3">
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => blockUser(user.id, user.status)}
                      className={`${
                        user.status
                          ? 'bg-green-500 hover:bg-green-600'
                          : 'bg-red-500 hover:bg-red-600'
                      } text-white px-3 py-2 rounded-md shadow-md transition duration-300`}
                    >
                      {user.status ? 'Block' : 'Unblock'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <PageNavigationBar/>
    </div>
  )
}

export default AdminUsers