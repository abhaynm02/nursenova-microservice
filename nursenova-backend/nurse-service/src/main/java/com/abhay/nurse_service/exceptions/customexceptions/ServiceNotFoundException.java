package com.abhay.nurse_service.exceptions.customexceptions;

public class ServiceNotFoundException extends RuntimeException{
    public ServiceNotFoundException(String message) {
        super(message);
    }
}
