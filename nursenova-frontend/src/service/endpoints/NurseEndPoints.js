const nurseRoutes ={
    registerNurse:'/auth/nurse/register',
    verifyOtp:'/auth/nurse/verify',
    details:'/register/details',
     getProfile:'/user/nurse/profile',
     updateProfile:'/user/nurse/profile/update',
     getNurseDetails:'/nurse/profile/details',
     showServices:'/user/nurse/show/services',
     addService:'/nurse/service/add',
     fetchServices:'/nurse/service/select/services',
     blcokService:'/nurse/service/block',
     findServiceById:'/nurse/service/find-by/id',
     deleteDuty:'/nurse/service/delete/duty-type',
     updateProfilePicture:'/nurse/profile/image/update',
     createSlotForBooking:'/booking/nurse/create',
     findCreateSlots:'/booking/nurse/available/slots',
     deleteSlotById:'/booking/nurse/delete',


}

export default nurseRoutes;