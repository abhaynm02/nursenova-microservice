package com.abhay.user_service.feignclient;

import com.abhay.user_service.dto.ProfileDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "nurse-service",url = "${application.config.user-url}",
        configuration = FeignClientConfiguration.class
        ,fallback = NurseServiceFallback.class)
public interface NurseClient {
    @PostMapping("/profile/update")
    ResponseEntity<Boolean>updateNurseProfile(@RequestBody ProfileDto profileDto);
}
