package com.abhay.notification_service.consumer;


import com.abhay.notification_service.dto.BookingNotification;
import com.abhay.notification_service.dto.OtpNotification;
import com.abhay.notification_service.email.EmailUtil;
import jakarta.mail.MessagingException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;

@Service
@Slf4j
public class kafkaConsumer {
    private final EmailUtil emailUtil;

    public kafkaConsumer(EmailUtil emailUtil) {
        this.emailUtil = emailUtil;
    }

    @KafkaListener(topics = "otpVerification",groupId = "otpNotification"
    ,containerFactory ="otpNotificationConcurrentKafkaListenerContainerFactory" )
    public void consumeMessage(OtpNotification notification) throws MessagingException, UnsupportedEncodingException {
        emailUtil.sentOtpEmail(notification.getEmail(),notification.getOtp());
        log.info("message{},{}",notification.getEmail(),notification.getOtp());
    }
    @KafkaListener(topics = "bookingAccept",
            groupId = "otpNotification",
            containerFactory ="bookingNotificationConcurrentKafkaListenerContainerFactory" )
    public void bookingAcceptNotificationAccept(BookingNotification notification) throws MessagingException {
        emailUtil.sendBookingConfirmation(notification);
        log.info("Booking accept notification :{}",notification.getEmail());
    }
}
