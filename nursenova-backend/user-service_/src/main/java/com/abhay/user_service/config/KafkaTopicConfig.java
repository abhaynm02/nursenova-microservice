package com.abhay.user_service.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
public class KafkaTopicConfig {
    public NewTopic otpVerification(){
        return TopicBuilder
                .name("otpVerification")
                .build();
    }


}
