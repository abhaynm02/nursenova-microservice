const userRoutes ={
      register:'/auth/register',
      otpVerification:'/auth/verify',
      login:'/auth/login',
      resendotp:'/auth/resent-otp',
      forgotpassword:'/auth/forgot-password',
      otpVerificationForgotpassword:'/auth/otp-verification/forgot-password',
      updatePassword:'/auth/password/update',
      services:'/home/services',
      profile:'/user/profile',
      updateProfile:'/user/profile/update',
      changePassword:'/user/profile/change-password',
      availableLocation:'/register/home/available/locations',
      findNursesByAvailableLocation:'/register/home/nurses/service',
      viewNurseDetails:'/nurse/home/view/nurse',
      findAvailableSlotForBooking:'/booking/user/available/slots',
      checkoutDetails:'/nurse/home/checkout',
      //creating paypal order url and success url
      createOrder:'/booking/user/payment/create',
      approveOrder:'/booking/user/payment/execute',
      bookservice:'/booking/user/book/service',



}
export default userRoutes;