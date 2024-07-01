package com.abhay.nurse_service.dto;

import lombok.*;

import java.util.List;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ServiceResponse {
    private long id;
    private long serviceId;
    private String serviceName;
    private List<ServiceDutyResponse> dutyTypes;
    private boolean available;
}
