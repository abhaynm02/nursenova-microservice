import React from 'react'
import NurseSideBar from '../component/nurseComponent/NurseSideBar'
import { Outlet } from 'react-router-dom'

const NurseProfileLayout = () => {
  return (
    <div className='flex'>
        <NurseSideBar>
        </NurseSideBar>
        <div className='flex-grow p-5'>
            <Outlet></Outlet>
        </div>
      
    </div>
  )
}

export default NurseProfileLayout
