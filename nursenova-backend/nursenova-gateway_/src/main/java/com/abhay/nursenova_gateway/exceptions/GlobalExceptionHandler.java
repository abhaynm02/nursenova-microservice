package com.abhay.nursenova_gateway.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(AuthHeaderNotFoundException.class)
    public ResponseEntity<?>authHeaderNotFound(AuthHeaderNotFoundException e ){
        return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
    }
    @ExceptionHandler(TokenInvalidException.class)
    public ResponseEntity<?>tokenInvalid(TokenInvalidException e ){
        return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_ACCEPTABLE);
    }
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleAllExceptions(Exception e) {
        return new ResponseEntity<>("An unexpected error occurred: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
