package com.abhay.user_service.exceptions.customexception;

public class DuplicateServiceNameException extends RuntimeException {
    public DuplicateServiceNameException(String message) {
        super(message);
    }
}
