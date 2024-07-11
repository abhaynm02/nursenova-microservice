package com.abhay.booking_service.dto;

import com.abhay.booking_service.model.BookingStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BookingResponse {
    private long id;
    private String userId;
    private String serviceName;
    private long totalDays;
    private BookingStatus status;
    private long totalPrice;
}
