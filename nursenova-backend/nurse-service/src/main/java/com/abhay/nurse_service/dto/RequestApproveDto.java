package com.abhay.nurse_service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RequestApproveDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String userName;
    private String phone;
    private String gender;
    private boolean isVerified;
}
