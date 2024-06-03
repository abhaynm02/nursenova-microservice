import React from 'react'
import { Route,Routes } from 'react-router-dom'
import UserRoutes from './UserRoutes'
import AdminRoutes from './AdminRoutes'
import NurseRoutes from './NurseRoutes'

const AppRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/*' element={<UserRoutes></UserRoutes>}></Route>
            <Route path='/admin/*' element={<AdminRoutes></AdminRoutes>}></Route>
            <Route path='/nurse/*' element={<NurseRoutes></NurseRoutes>}></Route>
        </Routes>

      
    </div>
  )
}

export default AppRoutes
