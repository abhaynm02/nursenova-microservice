package com.abhay.nurse_service.exceptions.customexceptions;

public class DuplicateServiceEntryException extends RuntimeException {
    public DuplicateServiceEntryException(String message) {
        super(message);
    }
}
