import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UserProfileLayout from '../layout/UserProfileLayout'
import Profile from '../component/Profile'
import UserPasswordChange from '../component/UserPasswordChange'
import UserWallet from '../component/UserWallet'

const UserProfileRoutes = () => {
  return (
    <div>
      <Routes>
        <Route element={<UserProfileLayout></UserProfileLayout>}>
        <Route index element={<Profile></Profile>}></Route>
        <Route path='/log' element={<Profile></Profile>}></Route>
        <Route path='/change-password' element={<UserPasswordChange></UserPasswordChange>}></Route>
        <Route path='/wallet' element={<UserWallet></UserWallet>}></Route>

        </Route>
      </Routes>
    </div>
  )
}

export default UserProfileRoutes
