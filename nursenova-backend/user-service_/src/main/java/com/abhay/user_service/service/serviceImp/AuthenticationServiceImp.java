package com.abhay.user_service.service.serviceImp;

import com.abhay.user_service.dto.*;
import com.abhay.user_service.exceptions.customexception.*;
import com.abhay.user_service.model.ForgetPasswordRequest;
import com.abhay.user_service.model.Role;
import com.abhay.user_service.model.UnverifiedUser;
import com.abhay.user_service.model.User;
import com.abhay.user_service.otp.OtpUtil;
import com.abhay.user_service.repository.ForgetPasswordRequestRepository;
import com.abhay.user_service.repository.UnverifiedUserRepository;
import com.abhay.user_service.repository.UserRepository;
import com.abhay.user_service.service.AuthenticationService;
import com.abhay.user_service.service.JwtService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.Message;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
@Slf4j
public class AuthenticationServiceImp implements AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final OtpUtil otpUtil;
    private final UnverifiedUserRepository unverifiedUserRepository;
    private final KafkaTemplate<String, OtpNotification>kafkaTemplate;
    private final ForgetPasswordRequestRepository forgetPasswordRequestRepository;

    public AuthenticationServiceImp(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService, AuthenticationManager authenticationManager, OtpUtil otpUtil, UnverifiedUserRepository unverifiedUserRepository, KafkaTemplate<String, OtpNotification> kafkaTemplate, ForgetPasswordRequestRepository forgetPasswordRequestRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.otpUtil = otpUtil;
        this.unverifiedUserRepository = unverifiedUserRepository;
        this.kafkaTemplate = kafkaTemplate;
        this.forgetPasswordRequestRepository = forgetPasswordRequestRepository;
    }

    public boolean isEmailExists(String email){
        if (userRepository.existsByEmail(email)){
            throw new DuplicateEmailException("Email already exists");
        }
        return true ;
    }


    public LoginResponse authenticate (LoginRequest request){

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );
        }catch (BadCredentialsException e){
            log.info(e.getMessage());
            throw new InvalidCredentialsException("Incorrect username or   password");
        }

        User user = userRepository.findByEmail(request.getEmail()).orElseThrow(()->new UserNotFoundExceptions("Incorrect username: " + request.getEmail()));
        String token = jwtService.generateToken(user);
        return LoginResponse.builder().username(user.getEmail()).role(user.getRole()).token(token).build();
    }

    @Override
    public Optional<UnverifiedUser> findUnverifiedUser(String email) {
        return unverifiedUserRepository.findByEmail(email);
    }

    @Override
    @Transactional
    public boolean verifyOtp(String otp, String email) {
        Optional<UnverifiedUser> userOptional = unverifiedUserRepository.findByEmail(email);
        if (userOptional.isEmpty()) {
            throw new UserNotFoundExceptions("User not found with email: " + email);
        }

        UnverifiedUser unverifiedUser = userOptional.get();
        log.info("User details: {}", unverifiedUser);

        if (!passwordEncoder.matches(otp, unverifiedUser.getOtp())) {
            log.info("Invalid OTP");
            throw new OtpInvalidException("The OTP is incorrect.");
        }

        if (unverifiedUser.getOtpExpiration().isBefore(LocalDateTime.now())) {
            log.info("OTP expired");
            throw new OtpExpireException("The OTP has expired.");
        }
        log.info("OTP verified successfully");
        registerVerifiedUser(unverifiedUser);
        unverifiedUserRepository.deleteByEmail(unverifiedUser.getEmail());
        return true;
    }

    @Override
    public RegisterResponse registerUnverifiedUser(RegisterRequest user) {
        String otp=generateOptAndSendMessage(user.getEmail());
        Optional<UnverifiedUser>existingUser =unverifiedUserRepository.findByEmail(user.getEmail());
        if (existingUser.isPresent()){
            UnverifiedUser unverifiedUser =existingUser.get();
            unverifiedUser.setOtp(passwordEncoder.encode(otp));
            unverifiedUser.setOtpExpiration(LocalDateTime.now().plusMinutes(2));
            log.info("otp for existing user {}",otp);
            unverifiedUserRepository.save(unverifiedUser);
        }else {
            UnverifiedUser user1= UnverifiedUser.builder().firstname(user.getFirstname())
                    .email(user.getEmail())
                    .phone(user.getPhone())
                    .lastname(user.getLastname())
                    .otp(passwordEncoder.encode(otp))
                    .password(passwordEncoder.encode(user.getPassword()))
                    .otpExpiration(LocalDateTime.now().plusMinutes(2)).build();
            log.info("otp for login :{}",otp);
            unverifiedUserRepository.save(user1);
        }


       return RegisterResponse.builder()
               .email(user.getEmail())
               .build();
    }

    @Override
    public void registerVerifiedUser(UnverifiedUser user) {
                 User verifiedUser =User.builder()
                         .firstname(user.getFirstname())
                         .lastname(user.getLastname())
                         .phone(user.getPhone())
                         .password(user.getPassword())
                         .role(Role.USER)
                         .email(user.getEmail())
                         .status(true).build();
                 userRepository.save(verifiedUser);
    }

    @Override
    public void resendOpt(String email) {
        Optional<UnverifiedUser>existingUser =unverifiedUserRepository.findByEmail(email);
        RegisterRequest request =new RegisterRequest();
        request.setEmail(existingUser.get().getEmail());
        registerUnverifiedUser(request);
    }

    private String generateOptAndSendMessage(String email){
        //generating otp
        String otp=otpUtil.generateOtp();
        //creating json for notification
        OtpNotification notification = OtpNotification.builder()
                .email(email)
                .otp(otp).build();
        //creating message for sending json object as kafka
        Message<OtpNotification>message = MessageBuilder
                .withPayload(notification)
                .setHeader(KafkaHeaders.TOPIC,"otpVerification")
                .build();
        kafkaTemplate.send(message);
        return otp;

    }

    @Override
    public void forgotPassword(String email) {
        User user=userRepository.findByEmail(email).orElseThrow(()->new UserNotFoundExceptions("user not found with given email please check your email"));
        String otp = generateOptAndSendMessage(user.getEmail());
        Optional<ForgetPasswordRequest>existingRequestUser = forgetPasswordRequestRepository.findByEmail(user.getEmail());

        if (existingRequestUser.isPresent()){
            ForgetPasswordRequest setRequest =existingRequestUser.get();
            setRequest.setOtp(passwordEncoder.encode(otp));
            setRequest.setOtpExpiration(LocalDateTime.now().plusMinutes(2));
            forgetPasswordRequestRepository.save(setRequest);
        }else {
            ForgetPasswordRequest newRequest = ForgetPasswordRequest.builder().
            email(user.getEmail())
                    .otp(passwordEncoder.encode(otp))
                    .otpExpiration(LocalDateTime.now().plusMinutes(2)).build();
            forgetPasswordRequestRepository.save(newRequest);
        }
    }

    @Override
    @Transactional
    public void verifyForgetPasswordOpt(VerificationRequest request) {
        log.info("in otp verification password:{},{}",request.getOtp(),request.getEmail());

        Optional<ForgetPasswordRequest>request1=forgetPasswordRequestRepository.findByEmail(request.getEmail());
        if (request1.isEmpty()) {
            throw new UserNotFoundExceptions("User not found with email: " + request.getEmail());
        }

        ForgetPasswordRequest validRequest = request1.get();
        log.info("User details: {}", validRequest);

        if (!passwordEncoder.matches(request.getOtp(), validRequest.getOtp())) {
            log.info("Invalid OTP");
            throw new OtpInvalidException("The OTP is incorrect.");
        }

        if (validRequest.getOtpExpiration().isBefore(LocalDateTime.now())) {
            log.info("OTP expired");
            throw new OtpExpireException("The OTP has expired.");
        }
        log.info("OTP verified successfully");
        unverifiedUserRepository.deleteByEmail(validRequest.getEmail());

    }

    @Override
    public void updatePassword(UpdatePassword request) {
        User user =userRepository.findByEmail(request.getEmail()).orElseThrow(()->new UserNotFoundExceptions("user not found "));
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        userRepository.save(user);
    }


}
