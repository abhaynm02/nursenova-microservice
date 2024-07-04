import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import UserLayout from '../layout/UserLayout'
import UserProtected from '../component/Protected/UserProtected'
import LoadingSpinner from '../component/LoadingSpinner' // Assuming you have this component

// Lazy load components
const LoginPage = lazy(() => import('../pages/LoginPage'))
const OtpPage = lazy(() => import('../pages/OtpPage'))
const RegisterPage = lazy(() => import('../pages/RegisterPage'))
const Home = lazy(() => import('../pages/Home'))
const ForgotPassword = lazy(() => import('../component/ForgotPassword'))
const PasswordSubmit = lazy(() => import('../component/PasswordSubmit'))
const UserServices = lazy(() => import('../component/UserServices'))
const WorkWithUs = lazy(() => import('../component/WorkWithUs'))
const UserProfileRoutes = lazy(() => import('./UserProfileRoutes'))
const DisplayNurses = lazy(() => import('../component/DisplayNurses'))
const UserViewNurse = lazy(() => import('../component/UserViewNurse'))

const UserRoutes = () => {
  return (
    <div>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/sign-up' element={<RegisterPage />} />
            <Route path='/otp' element={<OtpPage />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/password-submit' element={<PasswordSubmit />} />
            <Route path='/services' element={<UserServices />} />
            <Route path='/work-withus' element={<WorkWithUs />} />
            <Route path='/nurses/service/:location/:serviceId' element={<DisplayNurses />} />
            <Route element={<UserProtected />}>
              <Route path='/view/nurse/details/:userName/:serviceId' element={<UserViewNurse />} />
              <Route path='/profile/*' element={<UserProfileRoutes />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </div>
  )
}

export default UserRoutes