package com.abhay.booking_service.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
public class KafkaTopicConfig {
    public NewTopic bookingAccept(){
        return TopicBuilder
                .name("bookingAccept")
                .build();
    }
    public NewTopic bookingCancel(){
        return TopicBuilder
                .name("bookingCancel")
                .build();
    }
}
