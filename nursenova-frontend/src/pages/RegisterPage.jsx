import React, { useEffect } from 'react'
import Register from '../component/Register'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RegisterPage = () => {
  const navigate=useNavigate();
  const name = useSelector((state) => state.auth.email);
  useEffect(()=>{
    if(name){
      navigate(-1)
    }
  },[name])
  return (
    <div>
        <Register></Register>
    </div>
  )
}

export default RegisterPage
