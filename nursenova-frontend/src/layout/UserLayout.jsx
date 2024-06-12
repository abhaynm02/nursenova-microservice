import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../component/Header'
import Footer from '../component/Footer'

const UserLayout = () => {
  return (
    <div className='flex flex-col min-h-screen'>
        <Header></Header>
        <div className='flex-grow'>
           <Outlet></Outlet>
        </div>
       
        <Footer></Footer>
      
    </div>
  )
}

export default UserLayout
