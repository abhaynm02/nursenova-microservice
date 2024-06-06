import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../component/Footer'
import AdminHeader from '../component/AdminHeader'

const AdminLayout = () => {
  return (
    <div className='flex flex-col'>
        <AdminHeader></AdminHeader>
        <Outlet></Outlet>
        <Footer></Footer>
      
    </div>
  )
}

export default AdminLayout
