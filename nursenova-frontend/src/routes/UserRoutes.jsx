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

const UserRoutes = () => {
  return (
    <div>
       <Routes>
        <Route element={<UserLayout></UserLayout>}>
          <Route index  element={<Home></Home>}></Route>
          <Route path='/login' element={<LoginPage></LoginPage>}></Route>
          <Route path='/sign-up' element={<RegisterPage></RegisterPage>}></Route>
          <Route path='/otp' element={<OtpPage></OtpPage>}></Route>
          <Route path='forgot-password' element={<ForgotPassword/>}></Route>
          <Route path='/password-submit' element={<PasswordSubmit></PasswordSubmit>}></Route>
          <Route path='/profile' element={<Profile></Profile>}></Route>
        </Route>
      
     </Routes>
      
    </div>
  )
}

export default UserRoutes
