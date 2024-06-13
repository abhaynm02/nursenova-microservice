package com.abhay.nursenova_gateway.exceptions;

public class AuthHeaderNotFoundException extends RuntimeException{
    public AuthHeaderNotFoundException(String message) {
        super(message);
    }
}
