import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NurseLayout from '../layout/NurseLayout'
import NurseRegister from '../component/nurseComponent/NurseRegister'
import NurseOtp from '../component/nurseComponent/NurseOtp'
import DetailsSubmit from '../component/nurseComponent/DetailsSubmit'
import NurseHome from '../component/nurseComponent/NurseHome'
import NurseProfileRoutes from './NurseProfileRoutes'

const NurseRoutes = () => {
  return (
    <div>
      <Routes>
        <Route element={<NurseLayout></NurseLayout>}>
        <Route path='/register' element={<NurseRegister></NurseRegister>}></Route>
        <Route path='/otp' element={<NurseOtp></NurseOtp>}></Route>
        <Route path='/details-submit' element={<DetailsSubmit></DetailsSubmit>}></Route>
        <Route path='/home' element={<NurseHome></NurseHome>}></Route>
        <Route path='/profile/*' element={<NurseProfileRoutes></NurseProfileRoutes>}></Route>

        </Route>
      </Routes>
      
    </div>
  )
}

export default NurseRoutes
