package com.abhay.user_service.service;

import com.abhay.user_service.dto.*;
import com.abhay.user_service.model.UnverifiedUser;

import java.util.Optional;

public interface AuthenticationService {
    boolean isEmailExists(String email);
   LoginResponse authenticate (LoginRequest request);
   Optional<UnverifiedUser>findUnverifiedUser(String email);
   boolean verifyOtp(String otp,String email);
   RegisterResponse registerUnverifiedUser(RegisterRequest user);
   void registerVerifiedUser(UnverifiedUser user);
   void resendOpt(String email);
   void forgotPassword(String email);
   void verifyForgetPasswordOpt(VerificationRequest request);
   void updatePassword(UpdatePassword request);
   void nurseRegistration(UnverifiedUser request);
   RegisterResponse nurseOtpVerification(String otp,String email);

}
