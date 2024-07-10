package com.abhay.booking_service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SlotDto {
    private Long id;
    private LocalDate date;
    private boolean isAvailable;
    private String nurseId;
}
