package com.abhay.booking_service.service;

import com.abhay.booking_service.dto.BookingRequestDto;
import com.abhay.booking_service.dto.BookingResponse;
import com.abhay.booking_service.dto.ViewBooking;
import com.abhay.booking_service.exceptions.coustomexceptions.BookingStartDateException;
import com.abhay.booking_service.model.BookingStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.List;

public interface BookingService {
    void placeBooking(BookingRequestDto bookingRequestDto);
    Page<BookingResponse> findBookingsForNurse(Pageable page , String nurseId);
   ViewBooking findByBookingId(long bookingId);
   void updateBookingStatus(long bookingId, BookingStatus status);
   void cancelBooking(long bookingId) throws BookingStartDateException;
   void walletBooking(BookingRequestDto bookingRequestDto);
}
