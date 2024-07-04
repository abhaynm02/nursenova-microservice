package com.abhay.nurse_service.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ViewNurseDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String userName;
    private String phone;
    private long age;
    private String experience;
    private String education;
    private String profileImageLink;
    private String address;
    private String location;
    private String gender;
    private ServiceResponse serviceResponse;
    private List<LanguageDto>languageDtos;
}
