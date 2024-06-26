package com.abhay.user_service.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProfileDto {
    private String firstname;
    private String lastname;
    private String username;
    private String phone;
}
