import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import NurseLayout from '../layout/NurseLayout'
import NurseProtected from '../component/Protected/NurseProtected'
import LoadingSpinner from '../component/LoadingSpinner' 

// Lazy load components
const NurseRegister = lazy(() => import('../component/nurseComponent/NurseRegister'))
const NurseOtp = lazy(() => import('../component/nurseComponent/NurseOtp'))
const DetailsSubmit = lazy(() => import('../component/nurseComponent/DetailsSubmit'))
const NurseHome = lazy(() => import('../component/nurseComponent/NurseHome'))
const NurseProfileRoutes = lazy(() => import('./NurseProfileRoutes'))
const NurseService = lazy(() => import('../component/nurseComponent/NurseService'))

const NurseRoutes = () => {
  return (
    <div>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route element={<NurseLayout />}>
            <Route path='/register' element={<NurseRegister />} />
            <Route path='/otp' element={<NurseOtp />} />
            <Route path='/details-submit' element={<DetailsSubmit />} />
            <Route element={<NurseProtected />}>
              <Route path='/home' element={<NurseHome />} />
              <Route path='/services' element={<NurseService />} />
              <Route path='/profile/*' element={<NurseProfileRoutes />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </div>
  )
}

export default NurseRoutes