package com.abhay.booking_service.service;

import com.abhay.booking_service.dto.UserBookingResponseDto;
import com.abhay.booking_service.dto.UserBookingsDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface UserBookingService {
    Page<UserBookingsDto> findBookingsForUser(Pageable page,String userId);
    UserBookingResponseDto viewBookingDetails(long bookingId);
}
