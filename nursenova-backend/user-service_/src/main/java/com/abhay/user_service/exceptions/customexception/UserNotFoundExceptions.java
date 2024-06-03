package com.abhay.user_service.exceptions.customexception;

public class UserNotFoundExceptions extends RuntimeException{
    public UserNotFoundExceptions(String message){
        super(message);
    }
}
