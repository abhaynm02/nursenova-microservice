import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate,Outlet } from 'react-router-dom'

const UserProtected = () => {
    const role = useSelector((state) => state.auth.role);
  return (
    <div>
      {role==="USER"?<Outlet/>:<Navigate to="/login"/>}
    </div>
  )
}

export default UserProtected
