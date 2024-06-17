package com.abhay.nurse_service.exceptions.customexceptions;

public class DuplicateUsernameException extends RuntimeException{
    public DuplicateUsernameException(String message) {
        super(message);
    }
}
