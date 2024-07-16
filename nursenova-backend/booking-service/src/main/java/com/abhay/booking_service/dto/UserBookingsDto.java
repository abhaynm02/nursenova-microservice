package com.abhay.booking_service.dto;

import com.abhay.booking_service.model.BookingStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserBookingsDto {
    private long id;
    private String serviceName;
    private long totalDays;
    private BookingStatus status;
    private long totalPrice;
    private LocalDate startDate;
    private LocalDate endDate;
}
