package com.abhay.nursenova_gateway.exceptions;

public class TokenInvalidException extends RuntimeException{
    public TokenInvalidException(String message) {
        super(message);
    }
}
