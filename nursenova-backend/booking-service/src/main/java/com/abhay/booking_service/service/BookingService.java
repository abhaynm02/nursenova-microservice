package com.abhay.booking_service.service;

import com.abhay.booking_service.dto.BookingRequestDto;
import com.abhay.booking_service.dto.BookingResponse;

import java.time.LocalDate;
import java.util.List;

public interface BookingService {
    void placeBooking(BookingRequestDto bookingRequestDto);
    List<BookingResponse>findBookingsForNurse(String nurseId);
}
