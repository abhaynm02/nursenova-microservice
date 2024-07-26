import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import NurseProfileLayout from '../layout/NurseProfileLayout'
import LoadingSpinner from '../component/LoadingSpinner' 
import NurseWallet from '../component/nurseComponent/NurseWallet'

// Lazy load components
const NurseProfile = lazy(() => import('../component/nurseComponent/NurseProfile'))
const UserPasswordChange = lazy(() => import('../component/UserPasswordChange'))
const NurseDetails = lazy(() => import('../component/nurseComponent/NurseDetails'))

const NurseProfileRoutes = () => {
  return (
    <div>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route element={<NurseProfileLayout />}>
            <Route index element={<NurseProfile />} />
            <Route path='/change-password' element={<UserPasswordChange />} />
            <Route path='/details' element={<NurseDetails />} />
            <Route path='/wallet' element={ <NurseWallet></NurseWallet>}></Route>
          </Route>
        </Routes>
      </Suspense>
    </div>
  )
}

export default NurseProfileRoutes