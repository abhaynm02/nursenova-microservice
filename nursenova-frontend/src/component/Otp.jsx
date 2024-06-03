import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { otpVerify,reSendOpt } from '../api/user';
import { toast } from 'react-toastify';

const Otp = () => {
  const [otp, setOtp] = useState('');
  const [valid, setValid] = useState(true);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [resendTime, setResendTime] = useState(60);
  const[email,setEmail]=useState('');
  const location =useLocation();
  const navigate=useNavigate();

  useEffect(() => {
    if (location.state && location.state.userId) {
      setEmail(location.state.userId);
    }
  }, [location.state]);

  useEffect(() => {
    let timer;
    if (resendTime > 0 && resendDisabled) {
      timer = setTimeout(() => {
        setResendTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (resendTime === 0 && resendDisabled) {
      setResendDisabled(false);
    }
    return () => clearTimeout(timer);
  }, [resendTime, resendDisabled]);

  const handleResend =async () => {
   try{
    
    const response =await reSendOpt(data);
    console.log(response)
    if(response){
      toast.success(response.data.message)
    }

   }catch(error){

   }
   
    setResendTime(60);
    setResendDisabled(true);
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    if (validate()) {
      console.log(otp);
      try{
        const data={
          email:email,
          otp:otp
        }
    
        const response =await otpVerify(data);
        if(response){
          navigate('/login')
         
        }
    
       }catch(error){
    
       }
    }
  };

  const validate = () => {
    if (otp.trim() === '' || otp.length !== 6 || !/^\d+$/.test(otp)) {
      setValid(false);
      return false;
    }
    setValid(true);
    return true;
  };

  return (
    <div className="mx-auto flex justify-center items-center min-h-screen w-full bg-center bg-cover relative">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('src/assets/nurse_helping_in_home-2000x660-1.jpg')", opacity: 0.7 }}
      ></div>
      <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-20 z-10">
        <form
          onSubmit={handleSubmit}
          className="max-w-[500px] w-full mx-auto bg-white p-10 rounded-2xl shadow-2xl"
        >
          <h2 className="text-4xl font-bold text-center py-6">OTP Verification</h2>
          <p className="text-center text-gray-600 mb-8">
            Please enter the 6-digit OTP sent to your email
          </p>

          {!valid && (
            <div className="mb-6">
              <p className="text-red-600 font-semibold text-center p-3 bg-red-50 border border-red-200 rounded-md">
                Please enter a valid 6-digit OTP
              </p>
            </div>
          )}

          <div className="flex flex-col items-center">
            <label htmlFor="otp" className="font-semibold mb-4 text-lg">
              Enter OTP
            </label>
            <input
              id="otp"
              onChange={(e) => {
                setOtp(e.target.value);
                validate();
              }}
              className={`border p-4 text-center text-2xl tracking-[1rem] rounded-md w-64 ${
                !valid ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-green-400`}
              type="text"
              value={otp}
              maxLength={6}
              placeholder="······"
            />
          </div>

          <div className="flex justify-center mt-10">
            <button
              type="submit"
              className="w-full sm:w-auto font-bold text-white py-3 px-12 bg-green-500 hover:bg-green-600 rounded-xl transition duration-300 text-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
            >
              Verify OTP
            </button>
          </div>

          <div className="text-center mt-6">
            {resendDisabled ? (
              <p className="text-gray-600">
                Resend OTP in{' '}
                <span className="font-semibold text-blue-500">{resendTime}</span> seconds
              </p>
            ) : (
              <button
                className="text-blue-500 hover:text-blue-700 font-semibold transition-colors duration-300 focus:outline-none"
                onClick={handleResend}
              >
                Resend OTP
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Otp;