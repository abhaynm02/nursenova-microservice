package com.abhay.booking_service.exceptions.globalexceptions;

import com.abhay.booking_service.exceptions.coustomexceptions.BookingNotFoundException;
import com.abhay.booking_service.exceptions.coustomexceptions.BookingStartDateException;
import com.abhay.booking_service.exceptions.coustomexceptions.InsufficientBalanceException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(BookingNotFoundException.class)
    public ResponseEntity<?>handleBookingNotFoundException(BookingNotFoundException ex, WebRequest request){
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(BookingStartDateException.class)
    public ResponseEntity<?>handleBookingStartDateException(BookingStartDateException ex ,WebRequest request){
        return new ResponseEntity<>(ex.getMessage(),HttpStatus.NOT_ACCEPTABLE);
    }

    @ExceptionHandler(InsufficientBalanceException.class)
    public ResponseEntity<?>handleInsufficientBalance(InsufficientBalanceException ex,WebRequest request){
        return new ResponseEntity<>(ex.getMessage(),HttpStatus.NOT_ACCEPTABLE);
    }
}
