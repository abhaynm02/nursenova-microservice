package com.abhay.user_service.controller;

import com.abhay.user_service.dto.*;
import com.abhay.user_service.service.serviceImp.AuthenticationServiceImp;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@Slf4j
public class AuthController {

    private final AuthenticationServiceImp authService;

    public AuthController(AuthenticationServiceImp authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<RegisterResponse>register(@RequestBody RegisterRequest request){
        authService.isEmailExists(request.getEmail());


        return ResponseEntity.ok(authService.registerUnverifiedUser(request));
    }
    @PostMapping("/verify")
    public ResponseEntity<Void> verifyOtp(@RequestBody VerificationRequest request){
        log.info("email {}",request.getEmail());
        log.info("otp{}",request.getOtp());
        if (authService.verifyOtp(request.getOtp(),request.getEmail())){
           return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().build();
    }
    @PostMapping("/resent-otp")
    public ResponseEntity<String>resendOtp(@RequestBody String email){
        authService.resendOpt(email);
        return new ResponseEntity<>("otp send successfully ", HttpStatus.CREATED);
    }
    @PostMapping("/login")
    public ResponseEntity<LoginResponse>login(@RequestBody LoginRequest request){
        return ResponseEntity.ok(authService.authenticate(request));
    }
}
