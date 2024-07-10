package com.abhay.booking_service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PaymentRequest {
    private long total;
    private String currency;
    private String method;
    private String intent;
    private  String description;
    private String cancelUrl;
    private String successUrl;
}
