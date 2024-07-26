package com.abhay.nurse_service.service;

import com.abhay.nurse_service.dto.CheckoutResponse;

public interface CheckoutService {
    CheckoutResponse checkoutDetails(String nurseId, long serviceId, long totalDays);
}
