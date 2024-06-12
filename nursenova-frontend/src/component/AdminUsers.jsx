import React, { useEffect, useState } from 'react'
import { blockOrUnblockUser, findAllUsers } from '../api/admin'
import { toast } from 'react-toastify'

const AdminUsers = () => {
  const [users, setUsers] = useState([])
  const [dataFetch, setDataFetch] = useState(false)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await findAllUsers()
        setUsers(response.data)
      } catch (error) {
        console.log('Error fetching users:', error)
      }
    }
    fetchUsers()
  }, [dataFetch])

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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-center font-bold text-3xl md:text-4xl mb-8">Users</h1>
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
    </div>
  )
}

export default AdminUsers