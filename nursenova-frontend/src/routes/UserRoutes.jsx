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
import WorkWithUs from '../component/WorkWithUs'
import UserProfileLayout from '../layout/UserProfileLayout'
import UserProfileRoutes from './UserProfileRoutes'
import UserProtected from '../component/Protected/UserProtected'
import DisplayNurses from '../component/DisplayNurses'

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
        <Route path='/services' element={<UserServices></UserServices>}></Route>
        <Route path='/work-withus' element={<WorkWithUs></WorkWithUs>}></Route>
        <Route path='/nurses/service/:location/:serviceId' element={<DisplayNurses></DisplayNurses>}></Route>
        <Route element={<UserProtected></UserProtected>}>
        <Route path='/profile/*' element={<UserProfileRoutes></UserProfileRoutes>} />
        </Route>
      </Route>
    </Routes>
      
    </div>
  )
}

export default UserRoutes
