import React from 'react'
import { Outlet } from 'react-router-dom'
import UserSideBar from '../component/UserSideBar'

const UserProfileLayout = () => {
  return (
    <div className='flex  '>
       <UserSideBar></UserSideBar>
       <div className='flex-grow p-5  '>
        <Outlet></Outlet>
       </div>
      
    </div>
  )
}

export default UserProfileLayout
