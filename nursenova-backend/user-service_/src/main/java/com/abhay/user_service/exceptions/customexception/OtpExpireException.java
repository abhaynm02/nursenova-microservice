package com.abhay.user_service.exceptions.customexception;

public class OtpExpireException extends RuntimeException{
    public OtpExpireException(String message) {
        super(message);
    }
}
