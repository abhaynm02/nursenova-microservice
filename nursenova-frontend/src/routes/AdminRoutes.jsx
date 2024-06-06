import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminLayout from '../layout/AdminLayout'
import AdminServices from '../component/AdminServices'
import AdminDash from '../component/AdminDash'

const AdminRoutes = () => {
  return (
    <div>
      <Routes>
        <Route element={<AdminLayout></AdminLayout>}>
          <Route index element={<AdminDash></AdminDash>}></Route>
          <Route path='/services' element={<AdminServices></AdminServices>}></Route>

        </Route>
      </Routes>
      
    </div>
  )
}

export default AdminRoutes
