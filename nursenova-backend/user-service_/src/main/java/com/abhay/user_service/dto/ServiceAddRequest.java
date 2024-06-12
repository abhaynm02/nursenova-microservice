package com.abhay.user_service.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class ServiceAddRequest {
    private String ServiceName;
    private long basePrice;
    private String description;
    private boolean status;

}
