package com.abhay.nurse_service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class NurseDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String userName;
    private String phone;
    private long age;
    private String experience;
    private String education;
    private String profileImageLink;
    private String certificateImageLink;
    private String address;
    private String location;
    private String gender;
    private List<LanguageDto> languages;
    private boolean isVerified;


}
