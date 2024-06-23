import React from 'react'
import NurseHeader from '../component/nurseComponent/NurseHeader'
import { Outlet } from 'react-router-dom'
import Footer from '../component/Footer'

const NurseLayout = () => {
  return (
    <div className='flex flex-col min-h-screen'>
        <NurseHeader></NurseHeader>
        <div className='flex-grow'>
           <Outlet></Outlet>
           
        </div>
        <Footer></Footer>
      
    </div>
  )
}

export default NurseLayout
