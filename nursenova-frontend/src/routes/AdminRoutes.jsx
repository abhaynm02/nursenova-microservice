import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminLayout from '../layout/AdminLayout'
import AdminServices from '../component/AdminServices'
import AdminDash from '../component/AdminDash'
import AdminUsers from '../component/AdminUsers'
import NurseRequests from '../component/NurseRequests'
import AdminViewRequest from '../component/AdminViewRequest'
import AdminStaffs from '../component/AdminStaffs'
import AdminViewStaff from '../component/AdminViewStaff'
import AdminProtected from '../component/Protected/AdminProtected'

const AdminRoutes = () => {
  return (
    <div>
      <Routes>
        <Route element={<AdminLayout/>}>
        <Route element={<AdminProtected/>}>
          <Route path='/dashboard' element={<AdminDash/>}></Route>
          <Route path='/services' element={<AdminServices/>}></Route>
          <Route path='/users' element={<AdminUsers></AdminUsers>}></Route>
          <Route path='/nurse/requests' element={<NurseRequests></NurseRequests>}></Route>
          <Route path='/nurse/request/view/:username' element={<AdminViewRequest></AdminViewRequest>}></Route>
          <Route path='/staffs' element={<AdminStaffs></AdminStaffs>}></Route>
          <Route path='/staff/view/:username' element={<AdminViewStaff></AdminViewStaff>}></Route>
        </Route>
        </Route>
      </Routes>
      
    </div>
  )
}

export default AdminRoutes
