package com.abhay.nurse_service.dto;

import com.abhay.nurse_service.model.Gender;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DisplayNurseDto {
    private  Long id;
    private  String firstName;
    private  String lastName;
    private String userName;
    private  String profileImageLink;
    private Gender gender;
    private List<LanguageDto>languageDtos;
    private String serviceName;
    private long serviceId;
    private List<ServiceDutyResponse>dutyResponses;

}
