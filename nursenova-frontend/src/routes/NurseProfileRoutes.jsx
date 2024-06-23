import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NurseProfileLayout from '../layout/NurseProfileLayout'
import NurseProfile from '../component/nurseComponent/NurseProfile'
import UserPasswordChange from '../component/UserPasswordChange'
import NurseDetails from '../component/nurseComponent/NurseDetails'

const NurseProfileRoutes = () => {
  return (
    <div>
        <Routes>
            <Route element={<NurseProfileLayout></NurseProfileLayout>}>
            <Route index element={<NurseProfile></NurseProfile>}></Route>
            <Route path='/change-password' element={<UserPasswordChange></UserPasswordChange>}></Route>
            <Route path='/details' element={<NurseDetails></NurseDetails>}></Route>

            </Route>
        </Routes>
      
    </div>
  )
}

export default NurseProfileRoutes
