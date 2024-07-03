package com.abhay.nurse_service.exceptions.globlexception;

import com.abhay.nurse_service.exceptions.customexceptions.*;
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
    @ExceptionHandler(UsernameNotFoundException.class)
    ResponseEntity<?>handleUserNotFoundException(UsernameNotFoundException ex,WebRequest request){
        return new ResponseEntity<>(ex.getMessage(),HttpStatus.CONFLICT);
    }
    @ExceptionHandler(InternalServiceDownException.class)
    ResponseEntity<?>handleInternalServiceDownException(InternalServiceDownException ex,WebRequest request){
        return new ResponseEntity<>(ex.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @ExceptionHandler(DuplicateServiceEntryException.class)
    ResponseEntity<?>handleDuplicateServiceEntryException(DuplicateServiceEntryException ex,WebRequest request){
        return new ResponseEntity<>(ex.getMessage(),HttpStatus.CONFLICT);
    }
    @ExceptionHandler(NurseNotFoundException.class)
    ResponseEntity<?>handleNurseNotFoundException(NurseNotFoundException ex,WebRequest request){
        return new ResponseEntity<>(ex.getMessage(),HttpStatus.NOT_FOUND);
    }
    @ExceptionHandler(ServiceNotFoundException.class)
    ResponseEntity<?>handleServiceNotFoundException(ServiceNotFoundException ex,WebRequest request){
        return new ResponseEntity<>(ex.getMessage(),HttpStatus.OK);
    }
}
