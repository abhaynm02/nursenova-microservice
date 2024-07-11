package com.abhay.booking_service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BookingRequestDto {
    private String userId;
    private String nurseId;
    private long serviceId;
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
    private List<SlotDto>slotDtos;
}
