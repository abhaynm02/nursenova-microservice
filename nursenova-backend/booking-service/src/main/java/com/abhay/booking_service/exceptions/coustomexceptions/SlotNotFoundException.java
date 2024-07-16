package com.abhay.booking_service.exceptions.coustomexceptions;

public class SlotNotFoundException extends RuntimeException{
    public SlotNotFoundException(String message) {
        super(message);
    }
}
