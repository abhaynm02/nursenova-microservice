package com.abhay.booking_service.feignclient;

import com.abhay.booking_service.dto.NurseDto;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "nurse-service",url = "${application.config.nurse-url}",
        configuration = FeignClientConfiguration.class,
        fallback = NurseServiceFallback.class )
public interface NurseClient {
    @GetMapping("/booking/view/nurse/{nurseId}")
    @CircuitBreaker(name = "nurseService", fallbackMethod = "findNurseForViewBookingFallback")
    @Retry(name = "nurseService", fallbackMethod = "findNurseForViewBookingFallback")
    public ResponseEntity<NurseDto>findNurseForViewBooking(@PathVariable String nurseId);

    default ResponseEntity<NurseDto> findNurseForViewBookingFallback(String nurseId, Throwable throwable) {
        // Return a default or empty NurseDto
        return ResponseEntity.ok(new NurseDto());
    }
}
