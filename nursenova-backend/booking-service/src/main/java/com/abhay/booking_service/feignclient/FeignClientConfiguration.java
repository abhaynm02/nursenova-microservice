package com.abhay.booking_service.feignclient;

import feign.Feign;
import feign.RequestInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FeignClientConfiguration {
    @Bean
    public RequestInterceptor requestInterceptor(){
        return new FeignClientInterceptor();
    }

    public Feign.Builder feignBuilder(){
        return Feign.builder().requestInterceptor(requestInterceptor());
    }
}
