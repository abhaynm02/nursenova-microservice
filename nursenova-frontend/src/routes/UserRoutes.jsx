import React from 'react'
import { Route, Routes  } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import OtpPage from '../pages/OtpPage'
import RegisterPage from '../pages/RegisterPage'
import UserLayout from '../layout/UserLayout'
import Home from '../pages/Home'
import ForgotPassword from '../component/ForgotPassword'
import PasswordSubmit from '../component/PasswordSubmit'
import Profile from '../component/Profile'
import UserServices from '../component/UserServices'

const UserRoutes = () => {
  return (
    <div>
       <Routes>
      <Route element={<UserLayout />}>
        <Route index element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/sign-up' element={<RegisterPage />} />
        <Route path='/otp' element={<OtpPage />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/password-submit' element={<PasswordSubmit />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/services' element={<UserServices></UserServices>}></Route>
      </Route>
    </Routes>
      
    </div>
  )
}

export default UserRoutes
