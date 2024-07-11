import React from 'react'
import { approveOrder, createOrders } from '../api/user';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';

const PayPalButton = ({amount,handileSuccess}) => {

    const createOrder = async()=>{
        try {
            const data={
                 total:amount,
                 currency: "USD",
                 method: "paypal",
                 intent: "sale",
                 description: "Payment description",
                 cancelUrl: "http://localhost:3000/cancel",
                successUrl: "http://localhost:3000/success",
            }
            const response =await createOrders(data);
            return response.data.id;
        } catch (error) {
            console.log('Error creating order:', error);
        }
    }

    const onApporve = (data)=>{
        try {
            
            // const response =await  approveOrder(data.orderID,data.payerID)
            // const details=response.data;
            handileSuccess(data.orderID)
        } catch (error) {
            console.log('Error executing payment:',error);
        }
    }
  return (
   <PayPalScriptProvider options={{"client-id":"ASMwkDb1mqwZd2UcAFx-bTMc30T3GyKCnb_Bk-szPPxF1k34gguwI-x4tkXB5p-0akXsjPgnk2aFGctr"}}>
    <PayPalButtons 
    style={{layout:'vertical'}}
     createOrder={createOrder}
           onApprove={onApporve}
     >

    </PayPalButtons>

   </PayPalScriptProvider>
  )
}

export default PayPalButton;
