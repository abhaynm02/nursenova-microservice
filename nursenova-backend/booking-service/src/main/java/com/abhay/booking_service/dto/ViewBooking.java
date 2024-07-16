package com.abhay.booking_service.dto;

import com.abhay.booking_service.model.BookingStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ViewBooking {
   private long bookingId;
    private String serviceName;
    private long servicePrice;
    private long totalAmount;
    private long totalDays;
    private String dutyType;
    private String patientFullName;
    private long age;
    private String gender;
    private String medicalDetails;
    private String firstName;
    private String lastName;
    private String address;
    private String pin;
    private String paymentId;
    private BookingStatus status;
    private LocalDate startDate;
    private List<SlotDto> slotDtos;
}
