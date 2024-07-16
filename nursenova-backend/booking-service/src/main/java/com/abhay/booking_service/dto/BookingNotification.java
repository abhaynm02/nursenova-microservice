package com.abhay.booking_service.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BookingNotification {
    private String email;
    private String serviceName;
    private LocalDate staringDate;
    private LocalDate endDate;
    private long totalPrice;
    private String message;
}
