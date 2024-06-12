import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminLayout from '../layout/AdminLayout'
import AdminServices from '../component/AdminServices'
import AdminDash from '../component/AdminDash'
import AdminUsers from '../component/AdminUsers'

const AdminRoutes = () => {
  return (
    <div>
      <Routes>
        <Route element={<AdminLayout/>}>
          <Route path='/dashboard' element={<AdminDash/>}></Route>
          <Route path='/services' element={<AdminServices/>}></Route>
          <Route path='/users' element={<AdminUsers></AdminUsers>}></Route>
        </Route>
      </Routes>
      
    </div>
  )
}

export default AdminRoutes
