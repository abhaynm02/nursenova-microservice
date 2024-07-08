import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminLayout from '../layout/AdminLayout'
import AdminProtected from '../component/Protected/AdminProtected'
import LoadingSpinner from '../component/LoadingSpinner' 

// Lazy load components
const AdminServices = lazy(() => import('../component/AdminServices'))
const AdminDash = lazy(() => import('../component/AdminDash'))
const AdminUsers = lazy(() => import('../component/AdminUsers'))
const NurseRequests = lazy(() => import('../component/NurseRequests'))
const AdminViewRequest = lazy(() => import('../component/AdminViewRequest'))
const AdminStaffs = lazy(() => import('../component/AdminStaffs'))
const AdminViewStaff = lazy(() => import('../component/AdminViewStaff'))

const AdminRoutes = () => {
  return (
    <div>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route element={<AdminLayout />}>
            <Route element={<AdminProtected />}>
              <Route path='/dashboard' element={<AdminDash />} />
              <Route path='/services' element={<AdminServices />} />
              <Route path='/users' element={<AdminUsers />} />
              <Route path='/nurse/requests' element={<NurseRequests />} />
              <Route path='/nurse/request/view/:username' element={<AdminViewRequest />} />
              <Route path='/staffs' element={<AdminStaffs />} />
              <Route path='/staff/view/:username' element={<AdminViewStaff />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </div>
  )
}

export default AdminRoutes