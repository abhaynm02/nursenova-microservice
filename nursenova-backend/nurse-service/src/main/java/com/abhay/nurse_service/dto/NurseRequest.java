package com.abhay.nurse_service.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class NurseRequest {
    private String firstName;
    private String lastName;
    private String phone;
    private  long age;
    private String gender;
    private List<String> languages;
    private  String experience;
    private String education;
    private String address;
    private String location;
    private String username;
}
