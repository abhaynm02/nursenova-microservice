import React, { useEffect } from 'react'
import Otp from '../component/Otp'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const OtpPage = () => {
  const navigate=useNavigate();
  const name = useSelector((state) => state.auth.email);
  useEffect(()=>{
    if(name){
      navigate(-1)
    }
  },[name])
  return (
    
    <div>
        <Otp></Otp>
      
    </div>
  )
}

export default OtpPage
