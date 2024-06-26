package com.abhay.user_service.exceptions.customexception.globalexception;

import com.abhay.user_service.exceptions.customexception.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(InvalidCredentialsException.class)
    public ResponseEntity<?> handleInvalidCredentialsException(InvalidCredentialsException ex, WebRequest request){
        return new  ResponseEntity<>(ex.getMessage(), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(UserNotFoundExceptions.class)
    public ResponseEntity<?> handleUserNotFoundException(UserNotFoundExceptions ex, WebRequest request){
        return new ResponseEntity<>(ex.getMessage(),HttpStatus.NOT_FOUND);
    }
    @ExceptionHandler(OtpInvalidException.class)
    public ResponseEntity<?> handleOtpInvalidException (OtpInvalidException ex,WebRequest request){
        return new ResponseEntity<>(ex.getMessage(),HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(OtpExpireException.class)
    public ResponseEntity<?> handleOtpExpireException (OtpExpireException ex, WebRequest request){
        return new ResponseEntity<>(ex.getMessage(),HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(DuplicateEmailException.class)
    public ResponseEntity<?> handleDuplicateEmailException(DuplicateEmailException ex ,WebRequest request){
        return new ResponseEntity<>(ex.getMessage(),HttpStatus.CONFLICT);
    }
    @ExceptionHandler(DuplicateServiceNameException.class)
    public ResponseEntity<?> handleDuplicateServiceNameException(DuplicateServiceNameException ex ,WebRequest request){
        return new ResponseEntity<>(ex.getMessage(),HttpStatus.CONFLICT);
    }
    @ExceptionHandler(ServiceNotFoundException.class)
    public ResponseEntity<?> handleServiceNotFoundException(ServiceNotFoundException ex, WebRequest request){
        return new ResponseEntity<>(ex.getMessage(),HttpStatus.NOT_FOUND);
    }
    @ExceptionHandler(IncorrectPasswordException.class)
    public ResponseEntity<?>handleIncorrectPasswordException(IncorrectPasswordException ex,WebRequest request){
        return new ResponseEntity<>(ex.getMessage(),HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(InternalServiceDownException.class)
    public ResponseEntity<?>handleInternalServiceDownException(IncorrectPasswordException ex ,WebRequest request){
        return new ResponseEntity<>(ex.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
