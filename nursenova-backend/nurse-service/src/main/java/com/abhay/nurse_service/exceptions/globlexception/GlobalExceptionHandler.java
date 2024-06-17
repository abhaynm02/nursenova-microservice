package com.abhay.nurse_service.exceptions.globlexception;

import com.abhay.nurse_service.exceptions.customexceptions.DuplicateUsernameException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(DuplicateUsernameException.class)
    ResponseEntity<?>handleDuplicateUsernameException(DuplicateUsernameException ex , WebRequest request){
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.CONFLICT);
    }
}
