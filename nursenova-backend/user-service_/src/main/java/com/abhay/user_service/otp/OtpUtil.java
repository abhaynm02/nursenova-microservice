package com.abhay.user_service.otp;

import org.springframework.stereotype.Component;

import java.util.Random;

@Component
public class OtpUtil {
    public String generateOtp(){
        Random random = new Random();
        int randomNumber = random.nextInt(999999);
        StringBuilder outPut= new StringBuilder(Integer.toString(randomNumber));
        while (outPut.length()<6){
            outPut.insert(0, "0");
        }
        return outPut.toString();
    }
}
