package com.abhay.booking_service.exceptions.coustomexceptions;


public class BookingNotFoundException extends RuntimeException {
    public BookingNotFoundException(String message) {
        super(message);
    }
}
