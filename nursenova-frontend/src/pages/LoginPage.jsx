import React, { useEffect } from 'react'
import Login from '../component/Login'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const LoginPage = () => {
  const navigate=useNavigate();
  const name = useSelector((state) => state.auth.email);
  useEffect(()=>{
    if(name){
      navigate(-1)
    }
    
  },[name]);
  return (
    <div>
        <Login></Login>
      
    </div>
  )
}

export default LoginPage
