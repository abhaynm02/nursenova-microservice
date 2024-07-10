package com.abhay.nurse_service.dto;

import com.abhay.nurse_service.model.Duty;
import com.abhay.nurse_service.model.Gender;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CheckoutResponse {
    private String firstName;
    private String lastName;
    private long age;
    private Gender gender;
    private String phone;
    private String address;
    private String experience;
    private String education;
    private List<LanguageDto> languageDtos;
    private String serviceName;
    private  long servicePrice;
    private Duty duty;
}
