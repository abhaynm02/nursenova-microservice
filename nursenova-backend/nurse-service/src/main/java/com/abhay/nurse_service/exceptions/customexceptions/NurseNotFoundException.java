package com.abhay.nurse_service.exceptions.customexceptions;

public class NurseNotFoundException extends RuntimeException{
    public NurseNotFoundException(String message) {
        super(message);
    }
}
