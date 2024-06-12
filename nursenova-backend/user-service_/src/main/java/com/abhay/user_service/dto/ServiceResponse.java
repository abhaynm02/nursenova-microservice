package com.abhay.user_service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ServiceResponse {
    private long id;
    private String serviceName;
    private String description;
    private long basePrice;
    private boolean status;
}
