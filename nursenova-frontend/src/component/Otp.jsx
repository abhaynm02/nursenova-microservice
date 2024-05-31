import React, { useState, useEffect } from 'react';
import loginImage from '../assets/nursehelp1.jpeg';

const Otp = () => {
  const [otp, setOtp] = useState('');
  const [valid, setValid] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [resendTime, setResendTime] = useState(60);

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

  const handleResend = () => {
    // Add your logic to resend OTP here
    // For demonstration purposes, let's reset the timer
    setResendTime(60);
    setResendDisabled(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log(otp);
    }
  };

  const validate = () => {
    if (otp.trim() === '' || otp.length !== 6) {
      setValid(true);
      return false;
    }
    setValid(false);
    return true;
  };

  return (
    <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <div className="hidden sm:block">
        <img className="w-full h-full object-cover" src={loginImage} alt="OTP verification" />
      </div>
      <div className="bg-gray-100 flex flex-col justify-center p-4">
        <form onSubmit={handleSubmit} className="max-w-[400px] w-full mx-auto rounded-2xl bg-white p-6 shadow-2xl">
          <h2 className="text-3xl font-bold text-center py-2">OTP Verification</h2>
          <p className="text-center mb-4">Please enter the OTP sent to your email</p>
          {valid && <p className="text-red-600 font-bold text-center mb-4">Please enter a valid 6-digit OTP</p>}
          <div className="flex flex-col mt-1">
            <label>OTP</label>
            <input
              onChange={(e) => setOtp(e.target.value)}
              className="border p-2 rounded-md shadow-sm"
              type="text"
              value={otp}
            />
          </div>
          <div className="flex justify-center">
            <button className="border font-bold text-white my-5 py-2 bg-green-400 hover:bg-green-500 w-40 rounded-xl">
              Verify OTP
            </button>
          </div>
          <div className="text-center">
            {resendDisabled ? (
              <p>Resend OTP in {resendTime} seconds</p>
            ) : (
              <button
                className="text-blue-500 hover:underline focus:outline-none"
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
