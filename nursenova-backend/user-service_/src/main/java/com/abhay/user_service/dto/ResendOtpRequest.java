package com.abhay.user_service.dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResendOtpRequest {
    private String email;
}
