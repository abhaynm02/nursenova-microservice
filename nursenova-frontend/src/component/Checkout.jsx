import React, { useEffect, useState } from "react";
import PayPalButton from "./PayPalButton";
import { Briefcase } from "react-feather";
import { useLocation, useNavigate } from "react-router-dom";
import { bookservice } from "../api/user";


const Checkout = () => {
  const location = useLocation();
  const [servicePrice, setServicePrice] = useState();
  const [totalAmount, setTotalAmount] = useState();
  const [bookingData, setBookingData] = useState();
  const walletBalance = 150; // Example wallet balance
  const navigate=useNavigate();
  useEffect(() => {
    if (location.state?.data) {
      setServicePrice(location.state.data.servicePrice);
      setTotalAmount(location.state.data.totalAmount);
      setBookingData(location.state.data);
      console.log(location.state.data);
    }
  }, [location.state]);

  const handleSuccess = async (paymentId) => {
    try {
        const data=bookingData;
        data.paymentId=paymentId;
        console.log("payment success data", data);
        const response =bookservice(data);
        if(response)navigate("/success")
        
    } catch (error) {
        
    }
  };

  return (
    <div className="pt-16 w-full min-h-screen text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900 to-indigo-900 z-10 opacity-80"></div>

      <img
        className="absolute inset-0 w-full h-full object-cover object-center"
        src="/nurse_helping_in_home-2000x660-1.jpg"
        alt="Medical background"
      />

      <div className="relative z-20 container mx-auto px-4 min-h-screen flex flex-col justify-center items-center py-12 sm:py-16">
        <div className="bg-white bg-opacity-10 p-8 rounded-2xl backdrop-blur-sm max-w-md w-full">
          <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-shadow">
            Checkout
          </h1>

          <div className="space-y-6 mb-8">
            <div className="flex justify-between items-center text-lg">
              <span className="text-gray-300">Service Price:</span>
              <span className="font-semibold">${servicePrice}</span>
            </div>
            <div className="h-px bg-gray-600"></div>
            <div className="flex justify-between items-center text-xl font-bold">
              <span>Total Amount:</span>
              <span className="text-green-400">${totalAmount}</span>
            </div>
          </div>

          <div className="space-y-4">
            <PayPalButton
              amount={totalAmount}
              handileSuccess={handleSuccess}
            ></PayPalButton>

            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 flex items-center justify-between">
              <span className="flex items-center">
                <Briefcase className="w-5 h-5 mr-2" />
                Pay with Wallet
              </span>
              <span className="bg-green-500 px-2 py-1 rounded text-sm">
                Balance: ${walletBalance.toFixed(2)}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
