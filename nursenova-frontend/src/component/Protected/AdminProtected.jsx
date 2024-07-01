import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate,Outlet } from 'react-router-dom'
const AdminProtected = () => {
    const role = useSelector((state) => state.auth.role);
  return (
    <div>
       {role==="ADMIN"?<Outlet/>:<Navigate to="/"/>}
    </div>
  )
}

export default AdminProtected
