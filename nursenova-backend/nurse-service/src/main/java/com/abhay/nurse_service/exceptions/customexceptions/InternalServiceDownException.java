package com.abhay.nurse_service.exceptions.customexceptions;

public class InternalServiceDownException extends RuntimeException {
    public InternalServiceDownException(String message) {
        super(message);
    }
}
