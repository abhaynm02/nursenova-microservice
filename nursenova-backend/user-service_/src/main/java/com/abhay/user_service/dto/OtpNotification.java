package com.abhay.user_service.dto;


import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OtpNotification {

    private String email;
    private String otp;
}
