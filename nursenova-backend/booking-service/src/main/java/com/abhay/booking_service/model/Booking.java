package com.abhay.booking_service.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
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
    private LocalDate startDate;
    private LocalDate endDate;
    @OneToMany(cascade = CascadeType.ALL,mappedBy = "booking",fetch = FetchType.EAGER)
    private List<BookingSlot> slots;
    @Enumerated(EnumType.STRING)
    private BookingStatus status;
    private String paymentId;
}
