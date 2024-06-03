package com.abhay.notification_service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.apache.kafka.common.protocol.types.Field;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OtpNotification {
    private String email;
    private String otp;
}
