package com.abhay.booking_service.service;

import java.time.LocalDate;

public interface BookingService {
    void placeBooking(String nurseId, LocalDate startDate,LocalDate endDate);
}
