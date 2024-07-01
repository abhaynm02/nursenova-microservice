import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate,Outlet } from 'react-router-dom'

const NurseProtected = () => {
    const role = useSelector((state) => state.auth.role);
  return (
    <div>
       {role==="NURSE"?<Outlet/>:<Navigate to="/"/>}
    </div>
  )
}

export default NurseProtected
