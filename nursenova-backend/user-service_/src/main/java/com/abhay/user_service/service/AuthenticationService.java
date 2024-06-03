package com.abhay.user_service.service;

import com.abhay.user_service.dto.LoginRequest;
import com.abhay.user_service.dto.LoginResponse;
import com.abhay.user_service.dto.RegisterRequest;
import com.abhay.user_service.dto.RegisterResponse;
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
}
