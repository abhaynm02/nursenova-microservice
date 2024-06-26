package com.abhay.user_service.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PassWordUpdateDto {
    private String username;
    private String password;
    private String oldPassword;
}
