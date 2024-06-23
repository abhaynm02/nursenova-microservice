package com.abhay.nurse_service.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserBlockRequestDto {
    private String username;
    private boolean status;
}
