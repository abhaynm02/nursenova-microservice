import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import UserProfileLayout from '../layout/UserProfileLayout'
import LoadingSpinner from '../component/LoadingSpinner' 

// Lazy load components
const Profile = lazy(() => import('../component/Profile'))
const UserPasswordChange = lazy(() => import('../component/UserPasswordChange'))
const UserWallet = lazy(() => import('../component/UserWallet'))

const UserProfileRoutes = () => {
  return (
    <div>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route element={<UserProfileLayout />}>
            <Route index element={<Profile />} />
            <Route path='/log' element={<Profile />} />
            <Route path='/change-password' element={<UserPasswordChange />} />
            <Route path='/wallet' element={<UserWallet />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  )
}

export default UserProfileRoutes