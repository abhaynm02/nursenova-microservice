package com.abhay.nurse_service.feignclient;

import com.abhay.nurse_service.dto.UserBlockRequestDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "user-service",url = "${application.config.user-url}",
        configuration = FeignClientConfiguration.class,
        fallback = UserServiceFallback.class)
public interface UserClient {
    @PostMapping("/nurse/block")
    ResponseEntity<Boolean>blockUser(@RequestBody UserBlockRequestDto requestDto);
}
