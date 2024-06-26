package com.abhay.user_service.exceptions.customexception;

public class InternalServiceDownException extends RuntimeException {
    public InternalServiceDownException(String message) {
        super(message);
    }
}
